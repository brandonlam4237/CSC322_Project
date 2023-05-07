import os
import json

os.chdir(os.path.join("scraper", "Data"))
DATA_DIR = os.getcwd()

# Create Fixtures Directory if it doesn't exist
os.chdir(os.path.join("..", "..", "items"))
FIXTURES_DIR = os.path.join(os.getcwd(), "fixtures")
PRIMARY_FIXTURES_DIR = os.path.join(FIXTURES_DIR, "primary")
SECONDARY_FIXTURES_DIR = os.path.join(FIXTURES_DIR, "secondary")
if not os.path.exists(FIXTURES_DIR):
    os.makedirs(FIXTURES_DIR)
if not os.path.exists(PRIMARY_FIXTURES_DIR):
    os.makedirs(PRIMARY_FIXTURES_DIR)
if not os.path.exists(SECONDARY_FIXTURES_DIR):
    os.makedirs(SECONDARY_FIXTURES_DIR)

CATEGORY_DIR = os.path.join(DATA_DIR, "ItemInfo")
CATEGORY_PATHS = [os.path.join(CATEGORY_DIR, path)
                  for path in os.listdir(CATEGORY_DIR)]

global item_num
item_num = 1


def process_secondary_data(item_paths) -> tuple:
    """
    Function for processing ComputerPart data
    """
    global item_num

    category = item_paths[0].split('/')[-2]
    data_list = []

    for item in item_paths:
        with open(item) as item_file:
            new_data = {}
            old_data = json.load(item_file)[-1]

            model = "items.ComputerPart"

            new_data["model"] = model
            new_data["pk"] = item_num

            fields = {}
            try:
                if "Flash Drive" in old_data["name"]:
                    raise ValueError('No Flash Drives Allowed')

                # Product Fields
                fields["brand"] = old_data["brand"]
                fields["product_name"] = old_data["name"]
                fields["price"] = old_data["price"]
                fields["image_url"] = old_data["images"][0]

                # Specific Fields
                fields["product_sku"] = old_data["specs"]["SKU"]
                fields["manufacturer_part_number"] = old_data["specs"]["Mfr Part#"]
                fields["upc_number"] = old_data["specs"]["UPC"]

                del old_data["specs"]["SKU"]
                del old_data["specs"]["Mfr Part#"]
                del old_data["specs"]["UPC"]

                fields["specs"] = old_data["specs"]

                # Category
                if "Graphics" in old_data["category"]:
                    old_data["category"] = "GPU"
                if "Storage" in old_data["category"]:
                    old_data["category"] = "Storage"
                if "Cooling" in old_data["category"]:
                    old_data["category"] = "Cooling"
                if "Memory" in old_data["category"]:
                    old_data["category"] = "RAM"
                if "Case" in old_data["category"]:
                    old_data["category"] = "Case"
                if "Power" in old_data["category"]:
                    old_data["category"] = "PSU"
                if "Desktop" in old_data["category"]:
                    old_data["category"] = "Desktop"
                if "CPU" in old_data["category"]:
                    old_data["category"] = "CPU"
                if "Motherboards" in old_data["category"]:
                    old_data["category"] = "Motherboard"

                fields["category"] = old_data["category"]

                file_name = f"{category}-secondary.json".replace(
                    "&amp;", "&")

                if "" in fields.values():
                    continue

                new_data["fields"] = fields

                data_list.append(new_data)
                item_num += 1
            except:
                continue

    return (data_list, file_name)


def process_primary_data(item_paths) -> tuple:
    """
    Function for processing Product data
    """
    global item_num

    category = item_paths[0].split('/')[-2]
    data_list = []

    for item in item_paths:
        with open(item) as item_file:
            new_data = {}
            old_data = json.load(item_file)[-1]

            model = "items.Product"

            new_data["model"] = model
            new_data["pk"] = item_num

            fields = {}
            try:
                if "Flash Drive" in old_data["name"]:
                    raise ValueError('No Flash Drives Allowed')

                # Product Fields
                fields["brand"] = old_data["brand"]
                fields["product_name"] = old_data["name"]
                fields["price"] = old_data["price"]

                file_name = f"{category}-primary.json".replace(
                    "&amp;", "&")

                if "" in fields.values():
                    continue

                new_data["fields"] = fields

                data_list.append(new_data)
                item_num += 1
            except:
                continue

    return (data_list, file_name)


def main():
    global item_num

    item_num = 1
    for category in CATEGORY_PATHS:
        item_paths = [os.path.join(CATEGORY_DIR, category, path)
                      for path in os.listdir(category)]

        data_list, file_name = process_primary_data(item_paths=item_paths)

        with open(os.path.join(PRIMARY_FIXTURES_DIR, file_name), 'w') as fixture_file:
            json.dump(data_list, fixture_file, indent=4)

    item_num = 1
    for category in CATEGORY_PATHS:
        item_paths = [os.path.join(CATEGORY_DIR, category, path)
                      for path in os.listdir(category)]

        data_list, file_name = process_secondary_data(item_paths=item_paths)

        with open(os.path.join(SECONDARY_FIXTURES_DIR, file_name), 'w') as fixture_file:
            json.dump(data_list, fixture_file, indent=4)

    print(os.getcwd())


if __name__ == "__main__":
    main()
