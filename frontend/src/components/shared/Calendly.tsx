import './calendly.scss'
import React from 'react'
import { CalendlyEventListener } from 'react-calendly'
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics'

interface InputProps {
    name: string,
    companyName: string,
    email: string,
    eventType: string,
    calendlySrc: string,
    // setCalendlyEventDetails: (calendlyEventUri, calendlyInviteeUri) => void,
    onBookingSuccess: (calendlyEventUri, calendlyInviteeUri) => void
}

const Calendly = (props: InputProps) => {

    const googleAnalytics = useGoogleAnalytics()

    const listenToCalendlyEvent = (event) => {
        if (event.data.event === "calendly.event_scheduled") {
            googleAnalytics.trackButtonClick(`Calendly Schedule Event - ${props.eventType} - ${props.companyName}`)
            // props.setCalendlyEventDetails(event.data.payload.event.uri, event.data.payload.invitee.uri)
            props.onBookingSuccess(event.data.payload.event.uri, event.data.payload.invitee.uri)
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
                        <iframe
                            title="calendly-iframe"
                            frameBorder="0"
                            height="100%"
                            src={props.calendlySrc}
                            width="100%"
                        />
                    </div>
                </CalendlyEventListener>
            </div>
        </section>
    )
}

export default Calendly