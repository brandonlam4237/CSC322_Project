import os
import json

os.chdir(os.path.join("..", "scraper", "Data"))
DATA_DIR = os.getcwd()

# Create Fixtures Directory if it doesn't exist
os.chdir(os.path.join("..", "..", "server", "items"))
FIXTURES_DIR = os.path.join(os.getcwd(), "fixtures")
if not os.path.exists(FIXTURES_DIR):
    os.makedirs(FIXTURES_DIR)

CATEGORY_DIR = os.path.join(DATA_DIR, "ItemInfo")
CATEGORY_PATHS = [os.path.join(CATEGORY_DIR, path)
                  for path in os.listdir(CATEGORY_DIR)]

global item_num
item_num = 1


def process_data(item_paths) -> tuple:
    global item_num

    COMPUTER_CATEGORIES = {"gamingpc", "servers", "workstations"}

    category = item_paths[0].split('/')[-2]
    data_list = []

    for item in item_paths:
        with open(item) as item_file:
            new_data = {}
            old_data = json.load(item_file)[0]

            model = "items.Product"

            new_data["model"] = model
            new_data["pk"] = item_num

            fields = {}
            try:
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
                    old_data["category"] = "Graphics Cards"
                if "Storage" in old_data["category"]:
                    old_data["category"] = "Drives & Storage"

                fields["category"] = old_data["category"].replace(
                    "&amp;", "&")

                file_name = f"{category}.json".replace(
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
    for category in CATEGORY_PATHS:
        item_paths = [os.path.join(CATEGORY_DIR, category, path)
                      for path in os.listdir(category)]

        data_list, file_name = process_data(item_paths=item_paths)

        with open(os.path.join(FIXTURES_DIR, file_name), 'w') as fixture_file:
            json.dump(data_list, fixture_file, indent=4)

    print(os.getcwd())


if __name__ == "__main__":
    main()
