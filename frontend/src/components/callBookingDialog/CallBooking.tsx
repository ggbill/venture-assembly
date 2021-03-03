import './callBooking.scss'
import React from 'react'
import { CalendlyEventListener } from 'react-calendly'
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics'

interface InputProps {
    roundDetails: App.RoundDetails,
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setIsBookingSuccess: (boolean: boolean) => void
    persistRoundToDb: (calendlyEventUri, calendlyInviteeUri) => void,
}

const CallBooking = (props: InputProps) => {

    const googleAnalytics = useGoogleAnalytics()

    const listenToCalendlyEvent = (event) => {
        // console.log(event.data)

        if (event.data.event === "calendly.event_scheduled") {
            googleAnalytics.trackButtonClick(`Calendly Schedule Event - ${props.roundDetails.companyName}`)
            props.setIsBookingSuccess(true)
            props.persistRoundToDb(event.data.payload.event.uri, event.data.payload.invitee.uri)
        }
    }

    return (
        <section className="call-booking-section">
            <div>

                <CalendlyEventListener
                    onDateAndTimeSelected={listenToCalendlyEvent}
                    onEventScheduled={listenToCalendlyEvent}
                    onEventTypeViewed={listenToCalendlyEvent}
                    onProfilePageViewed={listenToCalendlyEvent}
                >
                    <div className="iframe-wrapper">
                    {/* <div className={props.currentStepNumber === 6 ? "iframe-wrapper confirmation" : "iframe-wrapper"}> */}
                        <iframe
                            title="calendly-iframe"
                            frameBorder="0"
                            height="100%"
                            src={`https://calendly.com/venture-assembly/free-call-what-next?embed_domain=https://www.ventureassembly.co&embed_type=Inline&name=${encodeURI(props.roundDetails.name)}&email=${encodeURI(props.roundDetails.email)}&location=44${encodeURI(props.roundDetails.phone)}`}
                            width="100%"
                        />
                    </div>

                </CalendlyEventListener>

            </div>
        </section>
    )
}

export default CallBooking