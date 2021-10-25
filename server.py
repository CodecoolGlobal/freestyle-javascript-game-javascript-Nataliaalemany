from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(
        debug=True,     # Allow verbose error reports
        port=5000       # Set custom port
    )