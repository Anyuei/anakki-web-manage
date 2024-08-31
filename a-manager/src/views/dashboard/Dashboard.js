import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibGoogle,
  cibFacebook,
  cibTwitter,
  cibLinkedin,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import DailyVisitChart from './DailyVisitChart' // Import the new chart component

const Dashboard = () => {
  const [startDate, setStartDate] = useState('2024-01-01')
  const [endDate, setEndDate] = useState('2024-08-01')


  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cilPeople },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cilUser },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cilPeople },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cilUser },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cilPeople },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cilUser },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cilPeople },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cilUser },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cilPeople },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cilUser },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cilPeople },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cilUser },
      activity: '1 hour ago',
    },
  ]

  return (
      <>
        <CRow>
          <CCol sm={12}>
            <CCard>
              <CCardHeader>
                Dashboard
              </CCardHeader>
              <CCardBody>
                <DailyVisitChart startDate={startDate} endDate={endDate} />
                <CRow>
                  {progressExample.map((item, index) => (
                      <CCol key={index} sm={6} md={4} lg={3}>
                        <CCard>
                          <CCardBody>
                            <h5>{item.title}</h5>
                            <CProgress
                                value={item.percent}
                                color={item.color}
                                size="sm"
                            />
                            <span>{item.value}</span>
                          </CCardBody>
                        </CCard>
                      </CCol>
                  ))}
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={12}>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Avatar</CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Country</CTableHeaderCell>
                  <CTableHeaderCell>Usage</CTableHeaderCell>
                  <CTableHeaderCell>Payment</CTableHeaderCell>
                  <CTableHeaderCell>Activity</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableExample.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <CAvatar src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.user.name}
                          {item.user.new && <CIcon icon={cilUser} />}
                        </div>
                        <div>{item.user.registered}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={item.country.flag} />
                        {item.country.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CProgress
                            value={item.usage.value}
                            color={item.usage.color}
                            size="sm"
                        />
                        <span>{item.usage.period}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={item.payment.icon} />
                        {item.payment.name}
                      </CTableDataCell>
                      <CTableDataCell>{item.activity}</CTableDataCell>
                    </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
      </>
  )
}

export default Dashboard
