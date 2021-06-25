import moment from 'moment';
moment.locale('pt-br');

export const getHumanizeDateAccess = (lastAccess: Date) => {
    const now = moment();
    const nowStartOfDay = now.clone().startOf('days');

    const lastAccessMoment = moment(lastAccess);
    const lastAccessMomentStartOfDay = lastAccessMoment.clone().startOf('days');

    const diffDays = nowStartOfDay.diff(lastAccessMomentStartOfDay, 'day');
    
    if (diffDays === 0) {
        return `visto por último hoje às ${lastAccessMoment.format('HH:mm')}`
    }
    else if (diffDays === 1) {
        return `visto por último ontem às ${lastAccessMoment.format('HH:mm')}`
    }
    else if (diffDays < 7) {
        return `visto por último ${lastAccessMoment.format('dddd')} às ${lastAccessMoment.format('HH:mm')}`
    }
    else {
        return `visto por último: ${lastAccessMoment.format('DD/MM/YYYY')} às ${lastAccessMoment.format('HH:mm')}`
    }

}

export const getHumanizeDateMessage = (lastAccess: Date) => {
    const now = moment();
    const nowStartOfDay = now.clone().startOf('days');
    const lastAccessMoment = moment(lastAccess);
    const lastAccessMomentStartOfDay = lastAccessMoment.clone().startOf('days');
    console.log(lastAccessMoment.format('DD/MM/YYYY'));

    const diffDays = nowStartOfDay.diff(lastAccessMomentStartOfDay, 'day');
    
    if (diffDays === 0) {
        return lastAccessMoment.format('HH:mm');
    }
    else if (diffDays === 1) {
        return 'otem';
    }
    else if (diffDays < 7) {
        return lastAccessMoment.format('dddd');
    }
    else {
        return lastAccessMoment.format('DD/MM/YYYY');
    }

}