export function tierColor(tier) {
    switch(tier) {
        case 2 :
            return 'yellow-400';
        case 3 :
            return 'blue-400';
        case 4 :
            return 'red-400';
        case 5 :
            return 'orange-400';
        default:
            return 'zinc-400';
    }
}

export function transColor(trans) {
    switch(trans) {
        case 'inv':
            return '#4ade85';
        case 'mkt':
            return '#c385f9';
    }
}

export function tierName(tier) {
    switch(tier) {
        case 2 :
            return 'uncommon';
        case 3 :
            return 'rare';
        case 4 :
            return 'epic';
        case 5 :
            return 'legendary';
        default:
            return 'common';
    }
}

export const Colors = {
    inv: 'green-400',
    mkt: 'purple-400',
    1: 'zinc-400',
    2: 'yellow-400',
    3: 'blue-400',
    4: 'red-400',
    5: 'orange-400'
};