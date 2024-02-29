import { useEffect, useState } from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from "../../styles/admin.module.css";

Chart.register(...registerables);

const fetchUserEngagement = async () => {
  const startDate = new Date('2023-05-07'); // Početni datum
  const endDate = new Date(); // Trenutni datum

  const engagementData = [];
  const labels = [];
  const analytics = getAnalytics();

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateString = formatDate(currentDate); // Formatiramo datum u formatu 'YYYY-MM-DD'

    // Pozivamo metodu logEvent da bismo poslali događaj za trenutni datum
    logEvent(analytics, 'user_engagement', {
      screen_name: 'Naziv ekrana',
      engagement_time_msec: 5000, // Vreme angažovanja u milisekundama
    });

    // Dobijamo podatke o angažovanosti korisnika za trenutni datum
    const userEngagement = Math.floor(Math.random() * 10); // Simuliramo dobijanje podataka o korisničkom angažovanju

    // Dodajemo podatke o angažovanosti korisnika u niz
    engagementData.push(userEngagement);

    const weekStartDate = new Date(currentDate);
    weekStartDate.setDate(weekStartDate.getDate() - 6); // Pomeramo se na početak nedelje
    labels.push(formatDate(weekStartDate)); // Dodajemo datum početka nedelje u niz oznaka


    // Pomeramo se na sledeći dan
    currentDate.setDate(currentDate.getDate() + 7); // Prelazimo na sledeću nedelju
  }

  return { engagementData, labels };
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const EventCountsChart = () => {
  const [engagementData, setEngagementData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserEngagement();
      setEngagementData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      
      <Line width={"600px"}
              height={"300px"}
        data={{
          labels: engagementData.labels, // Promenite ove oznake u skladu sa željenim nedeljama
          datasets: [
            {
              label: 'Aktivnost korisnika',
              data: engagementData.engagementData,
              backgroundColor: '#8c3baa5f',
              borderColor: '#8D3BAA',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, // Korak između svaka dva podeoka
              },
              max: 10,
            },
          },
        }}
      />
    </div>
  );
};

export default EventCountsChart;
