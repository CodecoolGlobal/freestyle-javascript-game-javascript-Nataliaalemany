from flask import Flask, render_template, request, redirect

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    else:
        type = request.form['theme']
        return redirect(f'/level_selection/{type}')


@app.route('/level_selection/<type>')
def level_selection(type):
    return render_template('level_selection.html', theme=type)


if __name__ == '__main__':
    app.run(
        debug=True,     # Allow verbose error reports
        port=5000       # Set custom port
    )