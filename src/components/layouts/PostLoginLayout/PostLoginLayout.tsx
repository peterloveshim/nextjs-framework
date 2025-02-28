'use client'

import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import CollapsibleSide from './components/CollapsibleSide'
import PageContainer from '@/components/template/PageContainer'
import queryRoute from '@/utils/queryRoute'
import useTheme from '@/utils/hooks/useTheme'
import { usePathname } from 'next/navigation'
import type { CommonProps } from '@/@types/common'
import type { LayoutType } from '@/@types/theme'

interface PostLoginLayoutProps extends CommonProps {
    layoutType: LayoutType
}

const Layout = ({ children, layoutType }: PostLoginLayoutProps) => {
    switch (layoutType) {
        case LAYOUT_COLLAPSIBLE_SIDE:
            return <CollapsibleSide>{children}</CollapsibleSide>
        default:
            return <>{children}</>
    }
}

const PostLoginLayout = ({ children }: CommonProps) => {
    const layoutType = useTheme((state) => state.layout.type)

    const pathname = usePathname()

    const route = queryRoute(pathname)

    return (
        <Layout
            layoutType={route?.meta?.layout ? route?.meta?.layout : layoutType}
        >
            <PageContainer {...route?.meta}>{children}</PageContainer>
        </Layout>
    )
}

export default PostLoginLayout
