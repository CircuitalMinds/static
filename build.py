from os import listdir, stat
from os.path import join, getctime
from time import ctime
from json import dumps


class Folder:
    name, path, files, dirs, total_size, info = None, None, [], [], 0.0, dict()

    def __init__(self, name):
        self.name = name
        self.path = join("storage", self.name)
        self.get_data()

    def get_data(self):
        fs = 1.024e-6
        for i in listdir(self.path):
            file = dict(
                name=i,
                path=join(self.path, i),
                size=stat(join(self.path, i)).st_size * fs,
                date=ctime(getctime(join(self.path, i)))
            )
            self.total_size += file["size"]
            self.files.append(file)
        self.info = {
            i: getattr(self, i) for i in (
                "files", "dirs", "name", "path", "total_size"
            )
        }


class Storage:
    folder_names = ("data", "documents", "scripts", "videos", "pictures")

    def __init__(self):
        for i in self.folder_names:
            setattr(self, i, Folder(i))
        self.save_info()

    def save_info(self):
        content, total_size = dict(files=[], dirs=[]), 0.0
        for i in self.folder_names:
            x = getattr(self, i)
            content["dirs"].append(x.info)
            total_size += x.total_size
        with open(join("data/storage.json"), "w") as f:
            f.write(dumps(
                dict(total_size=total_size, content=content), **dict(
                    indent=4, sort_keys=True, ensure_ascii=False
                )
            ))
