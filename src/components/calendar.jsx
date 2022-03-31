import React from "react";
import moment from "moment";
import "moment/locale/tr";
import { convertTime } from "helpers/utils";
import { useSelector } from "react-redux";
import useWindowDimensions from "hooks/useWindowDimensions";

function Calendar({ data }) {
    const { isLoading } = useSelector(state => state.city)
    const { width } = useWindowDimensions();

    return (
        <div className="w-full md:w-11/12 rounded-lg shadow-2xl p-2 bg-tertiary text-primary">
            {
                isLoading
                    ? "..."
                    : (
                        <table className="h-full w-full table-auto text-sm text-center">
                            <thead className="bg-primary text-white">
                                <tr className="text-base text-center">
                                    <th width={30} className="px-1">#</th>
                                    {
                                        width > 768
                                            ?
                                            <>
                                                <th>Gün</th>
                                                <th>Hicri Tarih</th>
                                                <th> Tarih</th>
                                            </>
                                            :
                                            null
                                    }
                                    <th>İmsak</th>
                                    <th className="px-1">Güneş</th>
                                    <th>Öğle</th>
                                    <th className="px-1">İkindi</th>
                                    <th>Akşam</th>
                                    <th className="px-1">Yatsı</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item, index) => {
                                    moment.locale("tr");
                                    return (
                                        <tr
                                            title={`${index === 25 ? "Kadir Gecesi" : ""}`}
                                            className={`${index === 25 ? "bg-primary text-white" : "bg-tertiary"}`}
                                            key={index}
                                        >
                                            <td width={30} className="text-center">{++index}</td>
                                            {
                                                width > 768
                                                    ?
                                                    <>
                                                        <td>{moment(item.date_for).format("dddd")}</td>
                                                        <td>{index} Ramazan 1443</td>
                                                        <td>{moment(item.date_for).format("DD MMMM YYYY")}</td>
                                                    </>
                                                    :
                                                    null
                                            }

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
