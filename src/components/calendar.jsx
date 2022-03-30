import React from "react";
import moment from "moment";
import "moment/locale/tr";
import { convertTime } from "helpers/utils";
import { useSelector } from "react-redux";

function Calendar({ data }) {
    const { isLoading } = useSelector(state => state.city)
    return (
        <div className="w-11/12  rounded-lg shadow-2xl p-2 bg-tertiary text-primary">
            {
                isLoading
                    ? "..."
                    : (
                        <table className="h-full w-full table-auto text-lg text-justify">
                            <thead className="bg-primary text-white">
                                <tr className="text-xl">
                                    <th>#</th>
                                    <th>Gün</th>
                                    <th>Hicri Tarih</th>
                                    <th>Miladi Tarih</th>
                                    <th>İmsak</th>
                                    <th>Güneş</th>
                                    <th>Öğle</th>
                                    <th>İkindi</th>
                                    <th>Akşam</th>
                                    <th>Yatsı</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item, index) => {
                                    moment.locale("tr");
                                    return (
                                        <tr
                                            title={`${index === 25 ? "Kadir Gecesi" : ""}`}
                                            className={`${index === 25 ? "bg-primary text-white" : "bg-tertiary"}`}
                                        >
                                            <td>{++index}</td>
                                            <td>{moment(item.date_for).format("dddd")}</td>
                                            <td>{index} Ramazan 1443</td>
                                            <td>{moment(item.date_for).format("DD MMMM YYYY")}</td>
                                            <td>{convertTime(item.fajr)}</td>
                                            <td>{convertTime(item.shurooq)}</td>
                                            <td>{convertTime(item.dhuhr)}</td>
                                            <td>{convertTime(item.asr)}</td>
                                            <td>{convertTime(item.maghrib)}</td>
                                            <td>{convertTime(item.isha)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )
            }
        </div>
    );
}

export default Calendar;
