import React from "react";
import moment from "moment";
import "moment/locale/tr";
import { convertTime } from "helpers/utils";
import { useSelector } from "react-redux";
import useWindowDimensions from "hooks/useWindowDimensions";

function Calendar({ data }) {
    const { isLoading } = useSelector(state => state.city)
    const { width } = useWindowDimensions();
    const limitedData = data.items.slice(0, 30)
    const festivalDay = data.items.slice(30, 31);

    // safari detect
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
                                {limitedData.map((item, index) => {
                                    moment.locale("tr");
                                    return (


                                        <tr
                                            title={`${index === 25 ? "Kadir Gecesi" : ""}`}
                                            className={`
                                                ${index === 25 ? "bg-primary text-white" : "bg-tertiary"}
                                                ${index === (parseInt(moment().format('D')) - 2) ? "bg-gray-300" : ""}
                                            `}
                                            key={index}
                                        >
                                            <td width={30} className="text-center">{++index}</td>
                                            {
                                                width > 768
                                                    ?
                                                    <>
                                                        <td>{index} Ramazan 1443</td>
                                                        <td>{
                                                            isSafari
                                                                ? moment(item.date_for, 'yyyy-M-D').format("Do MMMM dddd")
                                                                : moment(item.date_for).format('Do MMMM dddd')}
                                                        </td>
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
                                <tr>
                                    <td colSpan={width > 768 ? 10 : 7} className="text-center pt-2">
                                        Ramazan Bayramı 1. Gün : {isSafari ? moment(festivalDay[0].date_for, 'yyyy-M-D').format("Do MMMM dddd") : moment(festivalDay[0].date_for).format('Do MMMM dddd')}
}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )
            }
        </div>
    );
}

export default Calendar;
