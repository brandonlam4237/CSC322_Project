import os
import json

CLEAN_DATA_DIR = os.path.join(os.getcwd(), "json_data", "clean")
RAW_DATA_DIR = os.path.join(os.getcwd(), "json_data", "raw")

if not os.path.exists(CLEAN_DATA_DIR):
    os.mkdir(CLEAN_DATA_DIR)

clean_file_list = sorted([os.path.join(CLEAN_DATA_DIR, file)
                         for file in os.listdir(RAW_DATA_DIR)])
raw_file_list = sorted([os.path.join(RAW_DATA_DIR, file)
                       for file in os.listdir(RAW_DATA_DIR)])


def clean_entries(data: list, file_name: str) -> list:
    """Cleans the data enties in a certain JSON file

    Parameters
    ----------
    data : list
        A list of all entries retrieved from the JSON file
    file_name : str
        File name of the JSON file being cleaned

    Returns
    -------
    list
        A list of cleaned data entries
    """
    result = list()

    for entry in data:
        new_entry = {
            "name": entry["name"],
            "price_usd": entry["price_usd"]
        }

        # Remove unnecessary data
        del entry["name"]
        del entry["price_usd"]
        del entry["rating"]
        del entry["rating_count"]
        
        if file_name == "case-fan.json":
            del entry["airflow"]
            del entry["noise_level"]

        elif file_name == "case.json":
            del entry["power_supply"]

        elif file_name == "cpu-cooler.json":
            del entry["noise_level"]

        elif file_name == "cpu.json":
            del entry["smt"]

        elif file_name == "external-hard-drive.json":
            del entry["color"]

        elif file_name == "internal-hard-drve.json":
            pass

        elif file_name == "keyboard.json":
            pass

        elif file_name == "laptop.json":
            pass

        elif file_name == "memory.json":
            del entry["first_word_latency"]
            del entry["cas_latency"]

        elif file_name == "monitor.json":
            pass

        elif file_name == "motherboard.json":
            pass

        elif file_name == "mouse.json":
            pass

        elif file_name == "power-supply.json":
            pass

        elif file_name == "video-card.json":
            pass

        new_entry["description"] = entry
        result.append(new_entry)
    return result


def main():
    for file in raw_file_list:
        with open(file) as f:
            file_name = file.split('/')[-1]
            data = json.load(f)

            new_data = clean_entries(data, file_name)

            with open(os.path.join(CLEAN_DATA_DIR, file_name), 'w') as new_file:
                new_file.write(json.dumps(new_data))


if __name__ == '__main__':
    main()
