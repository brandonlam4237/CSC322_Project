import os
import json

CLEAN_DATA_DIR = os.path.join(os.getcwd(), "json_data", "clean")
RAW_DATA_DIR = os.path.join(os.getcwd(), "json_data", "raw")

clean_file_list = sorted([os.path.join(CLEAN_DATA_DIR, file)
                         for file in os.listdir(RAW_DATA_DIR)])
raw_file_list = sorted([os.path.join(RAW_DATA_DIR, file)
                       for file in os.listdir(RAW_DATA_DIR)])


def main():
    raw_files_length = len(raw_file_list)
    clean_files_length = len(clean_file_list)

    print("Total number of raw JSON files: ", raw_files_length)
    for file in raw_file_list:
        with open(file) as f:
            file_name = file.split('/')[-1]
            data = json.load(f)

            print("\tFile name: ", file_name)
            print("\tNumber of entries: ", len(data))
            print("\tFeatures list: ", list(data[0].keys()))
            print()

    print("Total number of clean JSON files: ", clean_files_length)
    for file in clean_file_list:
        with open(file) as f:
            file_name = file.split('/')[-1]
            data = json.load(f)

            print("\tFile name: ", file_name)
            print("\tNumber of entries: ", len(data))
            print("\tFeatures list: ", list(data[0]["description"].keys()))
            print()


if __name__ == '__main__':
    main()
