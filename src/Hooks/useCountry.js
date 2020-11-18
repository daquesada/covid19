import { useCallback } from 'react';
import { useContext } from 'react'
import {context} from '../Componets/Context/Country'
import {timelineContext} from '../Componets/Context/Timeline';

export function useCountry() {
    const {countries, loading} = useContext(context);
    const {stats, loadingTimeline} = useContext(timelineContext);

    const getStats = useCallback(
        () => {
            return stats
        },
        [stats],
    )

    const getCountries = useCallback(
        () => {
            return countries
        },
        [countries],
    )
    return {
        getStats,
        getCountries,
        loading: loading || loadingTimeline
    }
}
