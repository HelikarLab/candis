def write(path, dataset):
    with open(path, 'w') as f:
        attrs = dataset['attributes']
        data  = dataset['data']

        names = [ ]
        for attr in attrs:
            names.append(attr['name'])

        f.write(','.join(names))
        f.write('\n')

        for row in data:
            values = [ ]
            for key, value in row.items():
                values.append(str(value))

            f.write(','.join(values))
            f.write('\n')
