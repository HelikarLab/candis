# imports - standard imports
import os
import uuid

def assign_if_none(object_, value):
	if object_ is None:
		object_ = value

	return object_

def pardir(path, up = 1):
	for i in range(up):
		path = os.path.dirname(path)

	return path

def get_rand_uuid_str():
	object_ = uuid.uuid4()
	string  = str(object_)

	strip   = string.replace('-', '')

	return strip
