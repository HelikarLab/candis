# imports - standard imports
import os

def assign_if_none(objekt, value):
	if objekt is None:
		objekt = value

	return objekt

def pardir(path, up = 1):
	for i in range(up):
		path = os.path.dirname(path)

	return path
