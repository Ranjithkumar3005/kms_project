import os
import joblib
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
import geopandas as gpd
from shapely.geometry import Point
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

df = pd.read_csv(
    "D:\\kms_project\\backend\\dataset.csv",
    encoding="utf-8",
    on_bad_lines="skip",
)
df = df[df.latitude != 0]
df = df.dropna(subset=["longitude", "latitude"])

kmeans = joblib.load("D:\\kms_project\\backend\\kmeans_model.joblib")
df["cluster"] = kmeans.predict(df[["longitude", "latitude"]])
df["geometry"] = df.apply(lambda row: Point(row["longitude"], row["latitude"]), axis=1)
df = gpd.GeoDataFrame(df, geometry="geometry")
df = df.sort_values(by=["mmt_review_count", "hotel_star_rating"], ascending=False)
logging.info("Data loaded and processed successfully.")


def recommend_restaurants(df, longitude, latitude, city):
    df_city = df[df["city"].str.contains(city, case=False, na=False)]
    if df_city.empty:
        return pd.DataFrame()

    cluster = kmeans.predict(np.array([longitude, latitude]).reshape(1, -1))[0]
    recommended_hotels = df_city[df_city["cluster"] == cluster].iloc[0:5]
    return recommended_hotels


@app.route("/recommend", methods=["GET"])
def recommend():
    try:
        latitude = float(request.args.get("latitude"))
        longitude = float(request.args.get("longitude"))
        city = request.args.get("city")
        if not city:
            return jsonify({"error": "City name is required"}), 400

        Hotel_data = recommend_restaurants(df, longitude, latitude, city)

        if Hotel_data.empty:
            return (
                jsonify({"message": "No data found for the given city or coordinates"}),
                404,
            )
        dataList = [
            {
                "latitude": row.latitude,
                "longitude": row.longitude,
                "property_name": row.property_name,
                "hotel_star_rating": row.hotel_star_rating,
                "review_count": row.mmt_review_count,
                "address": row.area,
            }
            for _, row in Hotel_data.iterrows()
        ]
        return jsonify(dataList)

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
