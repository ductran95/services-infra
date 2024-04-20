import { check } from 'k6';
import http from 'k6/http';

export const options = {
    insecureSkipTLSVerify: true,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
    // Smoke test
    vus: 100, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
    duration: '1m', // This can be shorter or just a few iterations
    // Load test
    // stages: [
    //     { duration: '1m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    //     { duration: '3m', target: 300 }, // stay at 100 users for 30 minutes
    //     { duration: '1m', target: 0 }, // ramp-down to 0 users
    // ],
};

export default function () {
    const res = http.get('https://testapi.service.tvduc95.ovh/ping');
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}