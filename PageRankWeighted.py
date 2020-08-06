import numpy as np
import pandas as pd
import json


def getData(name):
    df=pd.read_excel(name)
    return df.values.tolist()

def getCities(name):
    df=pd.read_excel(name)
    result = []
    for i in df.values.tolist():
        if i[0] in result:
            continue
        result.append(i[0])
    for i in df.values.tolist():
        if i[1] in result:
            continue
        result.append(i[1])
    return result

def cityToNum(cities):
    num = 0
    result = {}
    for i in cities:
        result[i] = num
        num += 1
    return result

def creatMatrixM(cities, name):
    result = np.zeros((len(cities), len(cities)))
    cityNum = cityToNum(cities)
    data = getData(name)
    for i in data:
        result[cityNum[i[0]]][cityNum[i[1]]] += i[2]
    for i in range(len(cities)):
        rowSum = sum(result[i])
        if rowSum == 0:
            continue
        for j in range(len(cities)):
            result[i][j] /= rowSum
    return result.T


def createMatrixV(cities):
    result = np.ones(len(cities)).T
    return result * (1 / len(cities))

def teleport(matM):
    matMT = matM.T
    deadEnds = False
    for i in range(len(matM[0])):
        if sum(matMT[i]) == 0:
            deadEnds = True
            break
    if deadEnds:
        a = np.zeros(len(matM[0]))
        e = np.ones(len(matM[0]))
        for i in range(len(matM[0])):
            if sum(matMT[i]) == 0:
                a[i] = 1
        aT = np.array(a, ndmin=2).T
        e = np.array(e, ndmin = 2)
        return matM + np.dot(aT, e / len(matM)).T
    return matM

def randomTeleport(matM, b = 0.85):
    matMT = matM.T
    spiderTraps = False
    for i in range(len(matM[0])):
        if matMT[i][i] != 0:
            spiderTraps = True
            break
    if spiderTraps:
        result = b * teleport(matM) + (1 - b) * np.ones(matM.shape) *( 1 / len(matM[0]))
        return result
    return matM

def iteration(matM, times = 100, b = 0.85):
    matV = np.ones(len(matM[0])) * (1 / len(matM[0]))
    for i in range(times):
        matV = np.dot(randomTeleport(matM), matV)
    return matV

def pageRank(fileName):
    cities = getCities(fileName)
    citiesDic = cityToNum(cities)
    matM = creatMatrixM(cities, fileName)
    dataResult = iteration(matM)
    result = {}
    for i in cities:
        result[i] = dataResult[citiesDic[i]]
    sortedResult =sorted(result.items(),key=lambda x:x[1], reverse = True)
    for i in range(len(sortedResult)) :
        sortedResult[i] = {"city": sortedResult[i][0], "weight": sortedResult[i][1]}
    print(json.dumps(sortedResult[0:20]))


if __name__ == '__main__':
    cities = ['a', 'b', 'c', 'd']
    fileName = 'record.xlsx'
    pageRank(fileName)