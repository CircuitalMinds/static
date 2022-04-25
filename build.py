from os import listdir, stat, system
from os.path import join, getctime, isfile
from time import ctime
from json import dumps, load
from time import sleep
from sys import argv
cfg = load(open("conf.json"))


class Storage:
    path, folders = (cfg["storage"]["path"], cfg["storage"]["folders"])


    def __init__(self):
        self.content = dict()
        self.update()

    def update(self):
        for i in self.folders:
            self.content[i] = self.get_folder(i)
        self.save_info()

    def save_info(self):
        info = cfg["storage"]["info"]
        data = {
            "content": self.content, 
            "total_size": sum(
                x["total_size"] for x in self.content.values()
            )
        }
        with open(info["file"], "w") as f:
            f.write(dumps(data, **info["config"]))

    @staticmethod
    def get_size(x):
        return stat(x).st_size * 1.024e-6

    @staticmethod
    def get_date(x):
        return ctime(getctime(x))
    
    def get_data(self, x):
        return {
            "name": x.split("/")[-1],
            "path": x.replace("./", ""), 
            "size": self.get_size(x), 
            "date": self.get_date(x)
        }

    def get_folder(self, name):                  
        fpath = join(self.path, name)
        data = {"total_size": 0.0, "files": [], "dirs": []}
        for i in listdir(fpath):
            fi = join(fpath, i)
            if isfile(fi):
                file = self.get_data(fi)
                data["total_size"] += file["size"]
                data["files"].append(file)
            else:
                folder = self.get_folder(join(name, i))
                data["total_size"] += folder["total_size"]
                data["dirs"].append(folder)
        return data


class Timer:
    
    def __init__(self):
        self.lastupdate, self.delay, self.message, self.status = (None,) * 4
        self.update()        
    
    def start(self): 
        storage = Storage()
        while self.status == "on":
            storage.update()            
            print(self.message["update"])
            system(cfg["command"]["push"])
            print(self.message["push"])
            self.offset()            
            self.update()
    
    def update(self):
        cfg = load(open("conf.json"))
        for k, v in cfg["timer"].items():
            c = getattr(self, k)
            setattr(self, k, v)                
            if c is not None and c != v:
                print(f"data {k}: {c} updated to {v}")

    def offset(self):
        ts, t = 0, sum(
            int(x) * n for n, x in zip(
                [3600, 60, 1], self.delay.split(":")
            )
        )
        while ts < t:           
            ts += 1
            sleep(1)


def get_args():
    return argv[1:]