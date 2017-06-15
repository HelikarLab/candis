# imports - standard imports
import os
import uuid
import socket, errno

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

def get_free_port(host = None, seed = 1024):
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

	try:
		host = assign_if_none(host, '127.0.0.1')
		port = seed

		sock.bind((host, port))

		sock.listen(1)

		sock.close()
	except socket.error as e:
		if e.errno == errno.EADDRINUSE:
			if seed == 65535:
				raise ValueError('No ports available.')
			else:
				port = get_free_port(host, seed = seed + 1)
		else:
			raise e
	finally:
		sock.close()

	return port
