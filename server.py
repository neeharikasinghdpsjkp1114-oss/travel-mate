import http.server
import json
import os
import sqlite3
import urllib.parse

PORT = 5000
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "travelmate.db")
STATIC_DIR = os.path.dirname(os.path.abspath(__file__))


def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as conn:
        cursor = conn.cursor()
        # Trips table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS trips (
                id TEXT PRIMARY KEY,
                destination TEXT NOT NULL,
                departure TEXT,
                return_date TEXT,
                dates TEXT,
                duration TEXT,
                duration_num INTEGER,
                budget TEXT,
                budget_num REAL,
                currency TEXT,
                traveller_type TEXT,
                travellers INTEGER,
                styles TEXT,
                hotel TEXT,
                city TEXT,
                pace TEXT,
                img TEXT,
                active INTEGER DEFAULT 0
            )
        """)

        # Itinerary table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS itinerary (
                id TEXT PRIMARY KEY,
                trip_id TEXT NOT NULL,
                day INTEGER NOT NULL,
                city TEXT,
                hotel TEXT,
                notes TEXT,
                activities TEXT,
                FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
            )
        """)

        # Packing table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS packing (
                trip_id TEXT PRIMARY KEY,
                items TEXT NOT NULL,
                FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
            )
        """)

        # Budget table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS budget (
                trip_id TEXT PRIMARY KEY,
                categories TEXT NOT NULL,
                currency TEXT,
                FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE
            )
        """)

        # Seed with initial trip if empty
        cursor.execute("SELECT COUNT(*) as count FROM trips")
        if cursor.fetchone()["count"] == 0:
            seed_initial_data(cursor)
        conn.commit()


def seed_initial_data(cursor):
    trip_id = "trip-1"
    cursor.execute("""
        INSERT INTO trips (id, destination, departure, return_date, dates, duration, duration_num, budget, budget_num, currency, traveller_type, travellers, styles, hotel, city, pace, img, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        trip_id,
        "Kyoto & Osaka, Japan",
        "2026-10-10",
        "2026-10-16",
        "Oct 10 – Oct 16, 2026",
        "7 Days",
        7,
        "₹85,000",
        85000,
        "₹",
        "Couple / Pair",
        2,
        json.dumps(["Cultural & Historic", "Foodie Trail", "Romantic"]),
        "Gion Komachi Boutique Machiya",
        "Kyoto",
        "Balanced",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
        1
    ))

    days = [
        {
            "day": 1,
            "city": "Kyoto (Gion & Higashiyama)",
            "hotel": "Gion Komachi Boutique Machiya",
            "notes": "Remember to wear comfortable slip-on shoes for temple floors! Stop at % matchatea parlor.",
            "morning": [
                "Arrive at Kansai Airport & take Haruka Express train to Kyoto Station",
                "Check-in at traditional Machiya townhouse in Gion",
                "Stroll through Shirakawa Canal lined with weeping willows"
            ],
            "afternoon": [
                "Visit Kiyomizu-dera wooden stage overlooking autumn leaves",
                "Explore Ninenzaka and Sannenzaka preserved cobblestone streets",
                "Sample fresh warm dango & roasted hojicha soft serve"
            ],
            "evening": [
                "Lantern-lit stroll along Pontocho Alley",
                "Cozy dinner: handmade Kaiseki tofu & seasonal tempura",
                "Evening reflections at Yasaka Shrine"
            ]
        },
        {
            "day": 2,
            "city": "Kyoto (Arashiyama Bamboo Grove)",
            "hotel": "Gion Komachi Boutique Machiya",
            "notes": "Early morning wake-up ensures peaceful photos before tourist crowds arrive.",
            "morning": [
                "Catch early Randen retro tram to Arashiyama",
                "Walk through the whispering green Bamboo Forest pathway",
                "Explore Zen rock garden at Tenryu-ji temple"
            ],
            "afternoon": [
                "Cross Togetsukyo Bridge & visit Iwatayama Monkey Park",
                "Riverside matcha latte at % Arabica Coffee pavilion",
                "Hozugawa River wooden boat ride in the gentle breeze"
            ],
            "evening": [
                "Traditional Kyoto ramen dinner with rich yuzu broth",
                "Pick up hand-carved wooden souvenirs & washi tape notebooks"
            ]
        },
        {
            "day": 3,
            "city": "Kyoto (Fushimi Inari & Nara Excursion)",
            "hotel": "Gion Komachi Boutique Machiya",
            "notes": "Buy deer senbei biscuits carefully; the Nara deer are delightfully polite bowed greeters!",
            "morning": [
                "Hike through thousands of vermilion Torii gates at Fushimi Inari Shrine",
                "Scenic 40-minute scenic train to Nara Deer Park"
            ],
            "afternoon": [
                "Feed sweet bowed deer under pine trees",
                "Visit giant bronze Daibutsu Buddha at Todai-ji temple",
                "Sweet pause: freshly pounded green mugwort mochi at Nakatanidou"
            ],
            "evening": [
                "Return to Kyoto for dinner: Wagyu beef hotpot with local mushrooms",
                "Scrapbook journal writing session at café"
            ]
        },
        {
            "day": 4,
            "city": "Osaka (Dotonbori & Castle)",
            "hotel": "Cross Hotel Dotonbori",
            "notes": "Osaka is known as the 'Nation''s Kitchen' (Kuidaore) - eat till you drop!",
            "morning": [
                "Morning express train transfer to lively Osaka",
                "Tour the towering stone ramparts & moat of Osaka Castle"
            ],
            "afternoon": [
                "Explore vintage boutiques and vinyl shops in Amerikamura",
                "Street food safari: piping hot Takoyaki (octopus balls) with bonito flakes"
            ],
            "evening": [
                "Neon lights selfie with the iconic Glico Running Man sign",
                "Okonomiyaki savory pancake dinner at a counter teppanyaki grill",
                "Dotonbori canal evening river cruise"
            ]
        },
        {
            "day": 5,
            "city": "Osaka & Kansai Departure",
            "hotel": "Cross Hotel Dotonbori",
            "notes": "Keep tax-free receipts handy in your passport for quick customs verification.",
            "morning": [
                "Morning breakfast at Kuromon Ichiba Market (fresh strawberries & sea urchin)",
                "Last-minute souvenir shopping for matcha treats & Japanese stationery"
            ],
            "afternoon": [
                "Board Nankai Rapi:t retro-futuristic train to Kansai Airport",
                "Stamp final passport pages and departure boarding"
            ],
            "evening": [
                "Homeward flight with hearts and cameras full of memories ✈️"
            ]
        }
    ]

    for d in days:
        cursor.execute("""
            INSERT INTO itinerary (id, trip_id, day, city, hotel, notes, activities)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            f"{trip_id}-day-{d['day']}",
            trip_id,
            d["day"],
            d["city"],
            d["hotel"],
            d["notes"],
            json.dumps({"morning": d["morning"], "afternoon": d["afternoon"], "evening": d["evening"]})
        ))

    initial_packing = {
        "clothing": [
            {"text": "Lightweight linen shirts & tops (x4)", "done": True},
            {"text": "Comfy walking sneakers (broken in)", "done": True},
            {"text": "Cozy evening sweater or cardigan", "done": False},
            {"text": "Breathable travel trousers / skirt", "done": True},
            {"text": "Underwear & socks set (7 days)", "done": False},
            {"text": "Rain poncho / compact windbreaker", "done": False}
        ],
        "toiletries": [
            {"text": "SPF 50 mineral sunscreen", "done": True},
            {"text": "Hydrating lip balm & moisturizer", "done": False},
            {"text": "Refillable travel shampoo & soap bars", "done": True},
            {"text": "Small first-aid kit & blister plasters", "done": False},
            {"text": "Toothbrush & bamboo paste tablets", "done": True}
        ],
        "electronics": [
            {"text": "Universal plug adapter (Type A/C)", "done": True},
            {"text": "10,000 mAh portable powerbank", "done": False},
            {"text": "Polaroid or mirrorless camera + film", "done": False},
            {"text": "Noise-canceling earphones & cables", "done": True}
        ],
        "documents": [
            {"text": "Passport (valid 6+ months)", "done": True},
            {"text": "Physical paper copies of booking vouchers", "done": True},
            {"text": "Travel health insurance card", "done": False},
            {"text": "Multi-currency travel forex card & cash", "done": True}
        ],
        "miscellaneous": [
            {"text": "Washi tape & travel scrapbook journal", "done": True},
            {"text": "Gel pens & mini glue stick", "done": False},
            {"text": "Insulated stainless steel water bottle", "done": True},
            {"text": "Canvas fold-away tote for flea markets", "done": False}
        ]
    }
    cursor.execute("INSERT INTO packing (trip_id, items) VALUES (?, ?)", (trip_id, json.dumps(initial_packing)))

    initial_budget = [
        {"name": "Stay & Hotels", "key": "Stay", "amount": 32000, "colorClass": "fill-mint"},
        {"name": "Flights & Transit", "key": "Transit", "amount": 20000, "colorClass": "fill-pink"},
        {"name": "Food & Cafés", "key": "Food", "amount": 14000, "colorClass": "fill-yellow"},
        {"name": "Activities & Tickets", "key": "Activities", "amount": 8000, "colorClass": "fill-teal"},
        {"name": "Souvenirs & Extras", "key": "Shopping", "amount": 6000, "colorClass": "fill-lavender"}
    ]
    cursor.execute("INSERT INTO budget (trip_id, categories, currency) VALUES (?, ?, ?)", (trip_id, json.dumps(initial_budget), "₹"))

    # Seed two other saved trips
    cursor.execute("""
        INSERT INTO trips (id, destination, dates, duration, duration_num, budget, budget_num, currency, traveller_type, travellers, hotel, img, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        "trip-2",
        "Santorini & Milos, Greece",
        "May 14 – May 21, 2026",
        "8 Days",
        8,
        "€1,800",
        1800,
        "€",
        "Solo 🎒",
        1,
        "White Haven Cave House Oia",
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
        0
    ))

    cursor.execute("""
        INSERT INTO trips (id, destination, dates, duration, duration_num, budget, budget_num, currency, traveller_type, travellers, hotel, img, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        "trip-3",
        "Bali & Nusa Penida, Indonesia",
        "Dec 02 – Dec 09, 2026",
        "8 Days",
        8,
        "$1,200",
        1200,
        "$",
        "Friends ⛺",
        4,
        "Ubud Bamboo Canopy Eco-Villa",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        0
    ))


class TravelMateHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        response_bytes = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

    def read_json_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length > 0:
            raw = self.rfile.read(length).decode("utf-8")
            return json.loads(raw)
        return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        # API: GET /api/trips
        if path == "/api/trips":
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM trips ORDER BY active DESC, id DESC")
                trips = []
                for row in cursor.fetchall():
                    t = dict(row)
                    t["active"] = bool(t["active"])
                    t["styles"] = json.loads(t["styles"]) if t.get("styles") else []
                    trips.append(t)
                self.send_json(trips)
                return

        # API: GET /api/trips/<id>
        if path.startswith("/api/trips/") and not path.endswith(("/itinerary", "/packing", "/budget")):
            trip_id = path.split("/")[3]
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM trips WHERE id = ?", (trip_id,))
                row = cursor.fetchone()
                if not row:
                    self.send_json({"error": "Trip not found"}, 404)
                    return
                trip = dict(row)
                trip["active"] = bool(trip["active"])
                trip["styles"] = json.loads(trip["styles"]) if trip.get("styles") else []
                self.send_json(trip)
                return

        # API: GET /api/trips/<id>/itinerary
        if path.startswith("/api/trips/") and path.endswith("/itinerary"):
            trip_id = path.split("/")[3]
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM itinerary WHERE trip_id = ? ORDER BY day ASC", (trip_id,))
                itinerary = []
                for row in cursor.fetchall():
                    item = dict(row)
                    item["activities"] = json.loads(item["activities"]) if item.get("activities") else {}
                    itinerary.append(item)
                self.send_json(itinerary)
                return

        # API: GET /api/trips/<id>/packing
        if path.startswith("/api/trips/") and path.endswith("/packing"):
            trip_id = path.split("/")[3]
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT items FROM packing WHERE trip_id = ?", (trip_id,))
                row = cursor.fetchone()
                if row and row["items"]:
                    self.send_json(json.loads(row["items"]))
                else:
                    self.send_json(None)
                return

        # API: GET /api/trips/<id>/budget
        if path.startswith("/api/trips/") and path.endswith("/budget"):
            trip_id = path.split("/")[3]
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT categories, currency FROM budget WHERE trip_id = ?", (trip_id,))
                row = cursor.fetchone()
                if row:
                    self.send_json({
                        "categories": json.loads(row["categories"]),
                        "currency": row["currency"]
                    })
                else:
                    self.send_json(None)
                return

        # Serve static frontend files
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        # API: POST /api/trips (create trip, its itinerary, packing, budget)
        if path == "/api/trips":
            data = self.read_json_body()
            trip_id = data.get("id") or f"trip-{int(os.times().system * 1000)}"

            with get_db() as conn:
                cursor = conn.cursor()
                # Deactivate all other trips if active is True
                if data.get("active", True):
                    cursor.execute("UPDATE trips SET active = 0")

                cursor.execute("""
                    INSERT OR REPLACE INTO trips (id, destination, departure, return_date, dates, duration, duration_num, budget, budget_num, currency, traveller_type, travellers, styles, hotel, city, pace, img, active)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    trip_id,
                    data.get("destination", "New Adventure"),
                    data.get("departure", ""),
                    data.get("return_date", data.get("returnDate", "")),
                    data.get("dates", ""),
                    data.get("duration", "5 Days"),
                    data.get("duration_num", data.get("durationNum", 5)),
                    data.get("budget", ""),
                    data.get("budget_num", data.get("budgetNum", 0)),
                    data.get("currency", "₹"),
                    data.get("traveller_type", data.get("travellerType", "Solo")),
                    data.get("travellers", 1),
                    json.dumps(data.get("styles", [])),
                    data.get("hotel", "Cozy Stay"),
                    data.get("city", ""),
                    data.get("pace", "Balanced"),
                    data.get("img", "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"),
                    1 if data.get("active", True) else 0
                ))

                # If itinerary provided, insert
                if "itinerary" in data and isinstance(data["itinerary"], list):
                    cursor.execute("DELETE FROM itinerary WHERE trip_id = ?", (trip_id,))
                    for d in data["itinerary"]:
                        cursor.execute("""
                            INSERT INTO itinerary (id, trip_id, day, city, hotel, notes, activities)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        """, (
                            f"{trip_id}-day-{d.get('day', 1)}",
                            trip_id,
                            d.get("day", 1),
                            d.get("city", ""),
                            d.get("hotel", ""),
                            d.get("notes", ""),
                            json.dumps(d.get("activities", {
                                "morning": d.get("morning", []),
                                "afternoon": d.get("afternoon", []),
                                "evening": d.get("evening", [])
                            }))
                        ))

                # If packing provided
                if "packing" in data and data["packing"]:
                    cursor.execute("INSERT OR REPLACE INTO packing (trip_id, items) VALUES (?, ?)", (trip_id, json.dumps(data["packing"])))

                # If budget breakdown provided
                if "budget" in data and isinstance(data["budget"], (dict, list)):
                    categories = data["budget"].get("categories", data["budget"]) if isinstance(data["budget"], dict) else data["budget"]
                    currency = data.get("currency", "₹")
                    cursor.execute("INSERT OR REPLACE INTO budget (trip_id, categories, currency) VALUES (?, ?, ?)", (trip_id, json.dumps(categories), currency))
                elif "budget_breakdown" in data and data["budget_breakdown"]:
                    categories = data["budget_breakdown"].get("categories", data["budget_breakdown"]) if isinstance(data["budget_breakdown"], dict) else data["budget_breakdown"]
                    currency = data.get("currency", "₹")
                    cursor.execute("INSERT OR REPLACE INTO budget (trip_id, categories, currency) VALUES (?, ?, ?)", (trip_id, json.dumps(categories), currency))

                conn.commit()

            self.send_json({"success": True, "id": trip_id}, 201)
            return

        self.send_json({"error": "Endpoint not found"}, 404)

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")
        data = self.read_json_body()

        # API: PUT /api/trips/<id> (edit trip / set active)
        if path.startswith("/api/trips/") and not path.endswith(("/itinerary", "/packing", "/budget")):
            trip_id = path.split("/")[3]
            with get_db() as conn:
                cursor = conn.cursor()
                if data.get("active"):
                    cursor.execute("UPDATE trips SET active = 0")
                    cursor.execute("UPDATE trips SET active = 1 WHERE id = ?", (trip_id,))
                
                # Update any fields provided
                fields = []
                values = []
                field_map = {
                    "destination": "destination", "departure": "departure", "return_date": "return_date",
                    "dates": "dates", "duration": "duration", "duration_num": "duration_num",
                    "budget": "budget", "budget_num": "budget_num", "currency": "currency",
                    "traveller_type": "traveller_type", "travellers": "travellers", "hotel": "hotel",
                    "city": "city", "pace": "pace", "img": "img", "active": "active"
                }
                for k, col in field_map.items():
                    if k in data:
                        fields.append(f"{col} = ?")
                        values.append(data[k])
                if "styles" in data:
                    fields.append("styles = ?")
                    values.append(json.dumps(data["styles"]))

                if fields:
                    values.append(trip_id)
                    cursor.execute(f"UPDATE trips SET {', '.join(fields)} WHERE id = ?", values)
                conn.commit()

            self.send_json({"success": True, "id": trip_id})
            return

        # API: PUT /api/trips/<id>/itinerary
        if path.startswith("/api/trips/") and path.endswith("/itinerary"):
            trip_id = path.split("/")[3]
            days = data if isinstance(data, list) else data.get("days", [])
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM itinerary WHERE trip_id = ?", (trip_id,))
                for d in days:
                    cursor.execute("""
                        INSERT INTO itinerary (id, trip_id, day, city, hotel, notes, activities)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    """, (
                        f"{trip_id}-day-{d.get('day', 1)}",
                        trip_id,
                        d.get("day", 1),
                        d.get("city", ""),
                        d.get("hotel", ""),
                        d.get("notes", ""),
                        json.dumps(d.get("activities", {
                            "morning": d.get("morning", []),
                            "afternoon": d.get("afternoon", []),
                            "evening": d.get("evening", [])
                        }))
                    ))
                conn.commit()
            self.send_json({"success": True})
            return

        # API: PUT /api/trips/<id>/packing
        if path.startswith("/api/trips/") and path.endswith("/packing"):
            trip_id = path.split("/")[3]
            items = data if not isinstance(data, dict) or "items" not in data else data["items"]
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("INSERT OR REPLACE INTO packing (trip_id, items) VALUES (?, ?)", (trip_id, json.dumps(items)))
                conn.commit()
            self.send_json({"success": True})
            return

        # API: PUT /api/trips/<id>/budget
        if path.startswith("/api/trips/") and path.endswith("/budget"):
            trip_id = path.split("/")[3]
            categories = data.get("categories", data) if isinstance(data, dict) else data
            currency = data.get("currency", "₹") if isinstance(data, dict) else "₹"
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("INSERT OR REPLACE INTO budget (trip_id, categories, currency) VALUES (?, ?, ?)", (trip_id, json.dumps(categories), currency))
                conn.commit()
            self.send_json({"success": True})
            return

        self.send_json({"error": "Endpoint not found"}, 404)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")

        # API: DELETE /api/trips/<id>
        if path.startswith("/api/trips/"):
            trip_id = path.split("/")[3]
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM trips WHERE id = ?", (trip_id,))
                cursor.execute("DELETE FROM itinerary WHERE trip_id = ?", (trip_id,))
                cursor.execute("DELETE FROM packing WHERE trip_id = ?", (trip_id,))
                cursor.execute("DELETE FROM budget WHERE trip_id = ?", (trip_id,))
                conn.commit()
            self.send_json({"success": True, "deleted": trip_id})
            return

        self.send_json({"error": "Endpoint not found"}, 404)


def run_server():
    os.chdir(STATIC_DIR)
    init_db()
    server_address = ("", PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, TravelMateHandler)
    print(f"TravelMate backend server running at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()


if __name__ == "__main__":
    run_server()
