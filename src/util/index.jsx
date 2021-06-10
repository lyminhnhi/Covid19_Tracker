import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { lastDayOfMonths, lastDayOfWeeks } from "./constant";
import { fade, makeStyles } from '@material-ui/core/styles';

//For Table
export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  })
  return sortedData;
};

export const sortReverseData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return 1;
    } else {
      return -1;
    }
  })
  return sortedData;
};

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//For Map
export const showDataOnMap = (data, casesType = "cases") => {
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
}

const casesTypeColors = {
  cases: {
    hex: "#FF7F50",
    multiplier: 500,
  },
  recovered: {
    hex: "#40E0D0",
    multiplier: 500,
  },
  deaths: {
    hex: "#6495ED",
    multiplier: 800,
  },
};

//For Graph
export const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

export const handleDateOfDay = (data, caseType) => {
  let newData = [];
  for (let date in data[caseType]) {
    newData.push(date)
  }
  return newData;
};

export const handleValueOfDay = (data, caseType) => {
  let newData = [];
  for (let date in data[caseType]) {
    newData.push(data[caseType][date])
  }
  return newData;
};

export const handleDateOfWeek = (data, casesType) => {
  let newData = [];
  for (let date in data[casesType]) {
    lastDayOfWeeks.map(item => {
      if (item === date) {
        newData.push(date)
      }
    });
  }
  return newData;
}

export const handleValueOfWeek = (data, casesType) => {
  let newData = [];
  for (let date in data[casesType]) {
    lastDayOfWeeks.map(item => {
      if (item === date) {
        newData.push(data[casesType][date])
      }
    });
  }
  return newData;
}

export const handleDateOfMonth = (data, casesType) => {
  let newData = [];
  for (let date in data[casesType]) {
    lastDayOfMonths.map(item => {
      if (item === date) {
        newData.push(date)
      }
    });
  }
  return newData;
}

export const handleValueOfMonth = (data, casesType) => {
  let newData = [];
  for (let date in data[casesType]) {
    lastDayOfMonths.map(item => {
      if (item === date) {
        newData.push(data[casesType][date])
      }
    });
  }
  return newData;
}