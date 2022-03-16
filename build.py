from json import load, dumps, loads
from os import listdir, stat
from os.path import isfile, isdir, join, getctime
from time import ctime
from sys import argv


class Folder:

    def __init__(self, path):
        self.path = path
        self.dirs, self.files = {}, {}
        for i in listdir(self.path):
            d_path = join(self.path, i)
            if isfile(d_path):
                self.files[i] = d_path
            else:
                self.dirs[i] = d_path

    def dir_path(self, name):
        return self.dirs.get(name)

    def file_path(self, name):
        return self.files.get(name)

    def open_file(self, name):
        f_path = self.file_path(name)
        if f_path:
            if f_path.endswith(".json"):
                return load(open(f_path))
            else:
                return open(f_path).read()

    def open_dir(self, name):
        d_path = self.dir_path(name)
        if d_path:
            return Folder(d_path)

    def isdir(self, name):
        return isdir(join(self.path, name))

    def isfile(self, name):
        return isfile(join(self.path, name))

    def date(self, name=None):
        xpath = join(self.path, name) if name else self.path
        return ctime(getctime(xpath))

    def size(self, name=None):
        factor = 1024 * 10e-10
        get_size = lambda *ys: stat(join(self.path, *ys)).st_size * factor
        if name:
            if self.isfile(name):
                return get_size(name)
            else:
                data = {"total_size": 0.0}
                for i in listdir(join(self.path, name)):
                    s = get_size(i)
                    data[i] = s
                    data["total_size"] += s
                return data
        else:
            data = {"total_size": 0.0}
            for i in listdir(self.path):
                s = get_size(i)
                data[i] = s
                data["total_size"] += s
            return data


class Json:
    config = dict(
        indent=4,
        sort_keys=True,
        ensure_ascii=False
    )

    def __init__(self, path, new=False):
        self.path = path
        if new and path.endswith(".json"):
            with open(path, "w") as f:
                f.write(self.parse_json(**{}))
        self.data = self.open()

    def isfile(self):
        return all([
            isfile(self.path),
            self.path.endswith(".json")
        ])

    @staticmethod
    def from_string(data):
        return loads(data)

    @staticmethod
    def parse_json(**data):
        return dumps(data, **Json.config)

    def open(self):
        return load(open(self.path)) if self.isfile() else {}

    def update(self, **data):
        self.data.update(data)
        if self.isfile():
            to_json = self.parse_json(**self.data)
            with open(self.path, "w") as f:
                f.write(to_json)


if __name__ == '__main__':
    args = argv[1:]
    if "storage" in args:
        folder = Folder("storage")
        folder_data = dict(total_size=folder.size()["total_size"], content=dict(files=[], folders=[]))
        for x in folder.dirs:
            y = folder.open_dir(x)
            xdata = dict(name=x, path=y.path, folders=[], files=[])
            for y_name, y_path in y.files.items():
                xdata["files"].append({
                    "name": y_name,
                    "size": y.size(y_name),
                    "date": y.date(y_name)
                })
            folder_data["content"]["folders"].append(xdata)
        Json("data/storage.json", new=True).update(**folder_data)

