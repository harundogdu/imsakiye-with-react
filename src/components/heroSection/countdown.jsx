import Countdown from "react-countdown"

const CustomCountdown = ({ isLoading, iftarTime, setTimeStatus, timeStatus, sahurTime }) => {
    return (
        <div className='flex flex-col items-center justify-center text-3xl'>
            <p className={`mr-2 text-center my-1`}>
                {
                    timeStatus
                        ? "İftara Kalan Süre"
                        : "Sahur için Kalan Süre"
                }
            </p>
            <div>
                {
                    isLoading
                        ? "..."
                        : timeStatus
                            ? <Countdown
                                date={iftarTime}
                                daysInHours
                                overtime
                                onComplete={() => setTimeStatus(false)}
                            />
                            : <Countdown
                                date={sahurTime}
                                daysInHours
                                onComplete={() => setTimeStatus(true)}
                                overtime
                            />
                }
            </div>
        </div>
    )
}

export default CustomCountdown