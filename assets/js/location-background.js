(function () {
    'use strict';

    var root = document.documentElement;
    var westernTimeZones = [
        'America/Adak',
        'America/Anchorage',
        'America/Boise',
        'America/Denver',
        'America/Juneau',
        'America/Los_Angeles',
        'America/Metlakatla',
        'America/Phoenix',
        'America/Sitka',
        'America/Vancouver',
        'America/Whitehorse',
        'America/Yakutat',
        'Pacific/Honolulu'
    ];

    function setBackground(region) {
        root.setAttribute('data-background-region', region);
    }

    function regionFromTimeZone() {
        try {
            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            return westernTimeZones.indexOf(timeZone) !== -1 ? 'west' : 'east';
        } catch (error) {
            return 'east';
        }
    }

    // Timezone gives an immediate, permission-free approximation before paint.
    setBackground(regionFromTimeZone());

    // If location access was granted previously, refine the choice without
    // displaying a surprise permission prompt. The 100th meridian is a useful
    // dividing line between the western and eastern halves of the United States.
    if (!navigator.permissions || !navigator.geolocation) return;

    navigator.permissions.query({ name: 'geolocation' }).then(function (status) {
        if (status.state !== 'granted') return;

        navigator.geolocation.getCurrentPosition(function (position) {
            setBackground(position.coords.longitude < -100 ? 'west' : 'east');
        }, function () {}, {
            maximumAge: 60 * 60 * 1000,
            timeout: 3000
        });
    }).catch(function () {
        // Some browsers do not support querying geolocation permission.
    });
})();
