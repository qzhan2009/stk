import plotly
import plotly.plotly as py
import plotly.graph_objs as go
import plotly.figure_factory as FF
import matplotlib.pyplot as plt
from matplotlib import style

import numpy as np
import pandas as pd
import sys

id = sys.argv[1];
tp = sys.argv[2];

style.use('fivethirtyeight')
df = pd.read_csv('report/' + id + '.csv')
df.index = df["date"]
df[tp][:12].plot.bar()
plt.legend()
plt.show()
