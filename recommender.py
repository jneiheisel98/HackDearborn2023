

import csv
import pandas as pd
import numpy as np 
# reading csv file 
df = pd.read_csv("imdb_top_1000.csv")
df.info()
df = df.dropna(subset=['Certificate'])
df = df.dropna(subset=['Runtime'])
df.loc[df["Certificate"] == "S", "Certificate"] = "R"
df.loc[df["Certificate"] == "Unrated", "Certificate"] = "R"
df.loc[df["Certificate"] == "A", "Certificate"] = "R"
df.loc[df["Certificate"] == "TV-14", "Certificate"] = "PG-13"
df.loc[df["Certificate"] == "TV-PG", "Certificate"] = "PG"
df.loc[df["Certificate"] == "TV-MA", "Certificate"] = "R"
df.loc[df["Certificate"] == "1", "Certificate"] = "R"
df.loc[df["Certificate"] == "UA", "Certificate"] = "PG"
df.loc[df["Certificate"] == "U/A", "Certificate"] = "PG-13"
df.loc[df["Certificate"] == "16", "Certificate"] = "R"
df.loc[df["Certificate"] == "U", "Certificate"] = "G"
df.loc[df["Certificate"] == "GP", "Certificate"] = "PG"
df.loc[df["Certificate"] == "Passed", "Certificate"] = "R"
df.loc[df["Certificate"] == "Approved", "Certificate"] = "R"
genres=[]

for counting in range(0, len(df['Genre'].unique())):
    for ind in range(0, len(df['Genre'].unique()[counting].split(","))):
        genres.append((df['Genre'].unique()[counting].split(",")[ind]).strip())
genres = np.array(genres)
genres = np.unique(genres)
for counter in range(0, len(df)):
    
    if len(df.iloc[counter][5].split(",")) > 1:
        dataFr = []
        for ctr in range(0, len(df.iloc[counter][5].split(","))):
           
            for ind in range(0,5):
                dataFr.append(df.iloc[counter][ind])
            dataFr.append((df.iloc[counter][5].split(",")[ctr].strip()))
            for ind in range(6,len(df.iloc[counter])):
                dataFr.append(df.iloc[counter][ind])
        # dataFr = pd.DataFrame(np.array(dataFr))
            df.add(dataFr)
            
            dataFr = []
        df.iloc[counter][5] = df.iloc[counter][5].split(",")[0]
ovrScore = []
for counter in range(0, len(df)):
    score = 0
    counter = 1
    for x in range (0, len(genres)):
        if genres[x] == (df.iloc[counter][5]):
            break
        counter+=1
    score=100*counter
    if(df.iloc[counter][3] == "PG"):
        score += 10
    elif (df.iloc[counter][3] == "PG-13"):
        score += 20
    elif (df.iloc[counter][3] == "R"):
        score += 30
    elif (df.iloc[counter][3] == "G"):
        score += 40
    # index = genres.index(df.iloc[counter][5])