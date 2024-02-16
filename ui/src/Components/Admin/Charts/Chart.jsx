import React, { useEffect } from 'react';
const StudentChart = () => {
    const barChartData = {
        labels: ['Enroll Student', 'New Student', 'Drop Outs', 'Total Course'],
        datasets: [{
            label: 'Students Details',
            data: [100, 70, 60, 80, 20],
            backgroundColor: [
                '#00bbf0',
                '#38598b',
                '#f96d00',
                '#FFC300'
            ],
        }]
    };

    const pieChartData = {
        labels: ['Enroll Student', 'New Student', 'Drop Outs', 'Total Course'],
        datasets: [{
            label: 'Number of Students',
            data: [60, 55, 30, 30],
            backgroundColor: [
                '#00bbf0',
                '#38598b',
                '#f96d00',
                '#FFC300'
            ],

        }]
    };

    useEffect(() => {
        const createBarChart = () => {
            const barCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: barChartData,
            });
        };

        const createPieChart = () => {
            const pieCtx = document.getElementById('pieChart').getContext('2d');
            new Chart(pieCtx, {
                type: 'pie',
                data: pieChartData,
            });
        };

        createBarChart();
        createPieChart();
    }, []);

    return (
        <div className="m-auto">
            <div className="mx-0 px-0">
                <div className="row mb-5 mx-0 mb-2 pb-4 d-flex justify-content-center">
                    {/* Bar Chart */}
                    <div className="col-xl-4 col-xxl-3 col-sm-6">
                        <div className="widget-stat myshadow2 border-0 card">
                            <div className="card-body">
                                <canvas id="barChart" width="300" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    {/* Pie Chart */}
                    <div className="col-xl-4 col-xxl-3 col-sm-6">
                        <div className="widget-stat myshadow2 border-0 card">
                            <div className="card-body">
                                <canvas id="pieChart" width="300" height="300"></canvas>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-xxl-3 col-sm-6">
                        <div className="card myshadow border-0" id="NotishBoard">
                            <div className="card-header h4 text-white text-start" style={{ background: "var(--cardHeadColor )" }}>
                                <div data-aos="fade-right">  <i className="fa fa-comments text-warning" aria-hidden="true"></i> NEW MESSAGE</div>
                            </div>
                            <div className="card-body fw-normal FeatureCard2 my-0 py-0">
                                <marquee direction="up" scrollamount="3" behavior="scroll">
                                    <small>[1].
                                        Course certified by Microsoft.
                                        <img src="images/icon/gifPic.gif" className="img-fluid" width="40px" />
                                    </small>
                                    <hr width="90%" /> <small>[2]. CCC free on  ADCA course</small>
                                    <img src="images/icon/gifPic.gif" className="img-fluid" width="40px" />
                                    <hr width="90%" /> <small>[5]. Free English Speaking & Personality Development classNames</small>
                                    <img src="images/icon/gifPic.gif" className="img-fluid" width="40px" />
                                    <hr width="90%" /> <small className="HindiFont">[6]. प्रत्येक पाठ्यक्रम के पूरा होने पर नि: शुल्क
                                        प्रमाण
                                        पत्र। </small>
                                </marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentChart;
