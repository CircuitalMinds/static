from flask import Flask, render_template, url_for, redirect, jsonify, request
from flask_cors import CORS
from directory import get_folder, join
Data = get_folder("data")
config = Data.open_file("config.json")["static"]


def f_route(*paths):
    if paths:
        return join("/", *paths) + "/"
    else:
        return "/"


def add_routes(app):
    view = config["view"]
    methods, routes, data = [view[i] for i in ("methods", "routes", "data")]

    @app.route(f_route(), methods=methods)
    @app.route(f_route("<dir_name>"), methods=methods)
    def static_folder(dir_name=""):
        if dir_name == "data":
            return redirect(url_for("data_route"))
        else:
            return render_template("index.html", **data)

    @app.route(f_route("data"), methods=methods)
    @app.route(f_route("data", "<filename>"), methods=methods)
    def data_route(filename=None):
        file = None
        if filename:
            req = app.get_request()
            if "folder" in req:
                folder = Data.open_dir(req["folder"])
                if folder:
                    file = folder.open_file(filename)
            else:
                file = Data.open_file(filename)
        return jsonify(file if file else {})


def run(app):
    def server():
        app.run(**config["server"])
    return server


def get_request():
    g = request
    if g.method == "POST":
        return g.form.to_dict()
    else:
        return {y[0]: y[1] for y in list(filter(
            lambda x: len(x) == 2,
            [w.split("=") for w in g.query_string.decode("utf-8").split("&")]
        ))}


def init_app():
    app = Flask("static", **config["folders"])
    CORS(app)
    add_routes(app)
    app.run_server = run(app)
    app.get_request = get_request
    return app


app = init_app()
if __name__ == '__main__':
    app.run_server()
