import { softColors } from "utils/constants";

export const doughnutdata = {
  datasets: [
    {
      label: 'Count',
      data: [1, 3, 3, 2, 0],
      backgroundColor: softColors,
    },
  ],
  sources: ['Whatsapp', "Walk-In", "Partners", "Marketplace", "Others"]
};

export const piedata = {
  datasets: [
    {
      label: 'Count',
      data: [1, 3, 3, 2, 1],
      backgroundColor: softColors,
    },
  ],
  sources: ['Budget', "No-show", "Delayed", "Plan dropped", "Others"]
};

export const hbaroptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const hbarlabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const hbardata = {
  labels: hbarlabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: hbarlabels.map(() => Math.random()),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: hbarlabels.map(() => Math.random()),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
