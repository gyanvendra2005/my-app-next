import {Resend} from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY||"re_j3UCcErb_8fRbszxqWQxbtMYRoHm6htKv");