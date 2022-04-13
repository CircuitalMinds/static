from build import Storage
from json import load
from os import system
from time import sleep
from sys import argv


class Static:
    config = {}
    storage = Storage()

    def set_config(self):
        cfg = load(open("data/updater.json"))
        self.config["message"] = f"static {cfg['message']}"
        self.config["time"] = cfg["timer"]["value"] * {
            "seconds": 1,
            "minutes": 60,
            "hours": 3600
        }[cfg["timer"]["unit"]]

    def update(self):
        self.set_config()
        self.storage.save_info()
        system("bash push.sh")
        print(self.config["message"])

    def run(self):
        while True:
            self.update()
            sleep(self.config["time"])


if __name__ == "__main__":
    opts = argv[1:]
    if "run" in opts:
        Static().run()
