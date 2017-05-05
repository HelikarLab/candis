# imports - standard imports
import os
import uuid

def get_version_str(version):
    string  = '.'.join(map(str, version))

    return string

def assign_if_none(obj, value):
    if obj is None:
        obj = value

    return obj

def pardir(path, up = 1):
    for i in range(up):
        path = os.path.dirname(path)

    return path

def get_uuid(version = 4):
    if   version == 1:
        uuid_ = uuid.uuid1()
    elif version == 3:
        uuid_ = uuid.uuid3()
    elif version == 4:
        uuid_ = uuid.uuid4()

    return uuid_

def get_uuid_str(version = 4):
    uuid_  = get_uuid(version = version)
    string = str(uuid_)

    return string

def has_key(dict_, key):
    has = False
    
    if key in dict_:
        has = True

    return has
