import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const SkeletonCard = () => {
  return (
    <Stack spacing={1} alignItems={'center'}>
    <Skeleton variant="circular" width={90} height={90} />
    <Skeleton variant="rounded" width={280} height={80} />
  </Stack>
  )
}

export default SkeletonCard