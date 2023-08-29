import requests
from flask import Flask,render_template
import datetime
import pytz
r = requests.get("https://gdscdev.vercel.app/api")
data = r.json()
total = data['content']['meta']['total']
country_list = set()
def main():
    for i in range(0,total):
        current_date = datetime.datetime.fromisoformat(data['content']['data'][i]['date_time'])
        data['content']['data'][i]['date_time_obj'] = current_date
        data['content']['data'][i]['date_time'] = current_date.strftime("%d %b, %Y %H:%M:%S") + f" ({current_date.tzinfo})"
    data['content']['data'].sort(key = lambda x:x['date_time_obj'])
    for i in range(0,total):
        data['content']['data'][i]['id'] = i+1
        country_list.add(data['content']['data'][i]['venue_country'])
main()


app = Flask(__name__)
@app.route('/')
@app.route('/home')
def home():
    data_date=list()
    country_list_future = set()
    for id in range(0,total):
        if( data['content']['data'][id]['date_time_obj'] >= pytz.UTC.localize(datetime.datetime.now())):
            data_date.append(data['content']['data'][id])
            country_list_future.add(data['content']['data'][id]['venue_country'])

    return render_template("upcoming.html", datas = data_date,type = "Future", count = len(data_date),countries = country_list_future)

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/posts/<int:id>')
def info(id):
    if (id > 0) and id <= int(total):
        return render_template("info.html", post = data['content']['data'][id-1],title = data['content']['data'][id-1]['title'])
    return render_template('404.html'),404

@app.route('/all')
def all():
    return render_template("home.html",posts = data['content']['data'],type = "All",count = total,countries = country_list)

@app.route('/finished')
def finished():
    data_date=list()
    country_list_past = set()
    for id in range(0,total):
        if( data['content']['data'][id]['date_time_obj'] < pytz.UTC.localize(datetime.datetime.now())):
            data_date.append(data['content']['data'][id])
            country_list_past.add(data['content']['data'][id]['venue_country'])
    return render_template("upcoming.html", datas = data_date,type="Past",count = len(data_date),countries = country_list_past)

# if __name__ == "__main__":
#    app.run(debug=True)