import React from 'react'
import { useTranslation } from 'next-i18next'

const TransView = () => {
  const { t } = useTranslation('common')
  return (
    <div>{t('home_title')}</div>
  )
}

export default TransView

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
      // Will be passed to the page component as props
    },
  }
}