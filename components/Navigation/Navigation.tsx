import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'

import { LinkButton } from '../Button'

const useSticky = () => {
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const [sticky, setSticky] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!stickyRef.current) {
      return
    }
    setOffset(stickyRef.current.offsetTop)
  }, [stickyRef, setOffset])

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return
      }

      setSticky(window.scrollY > offset)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setSticky, stickyRef, offset])
  return { stickyRef, sticky }
}

export default useSticky

type SecondaryLink = {
  linkText?: string
  link?: {
    href: string
    target?: '_self' | '_blank'
  }
}

type SubnavLink = {
  icon?: { url: string; dimensions: { width: number; height: number } }
  iconAlt: string
  linkText?: string
  link?: {
    href: string
    target?: '_self' | '_blank'
  }
  subtext?: string
}

type SubnavGroup = {
  heading: string
  subnavLinks?: SubnavLink[]
}

type MainLink = {
  text?: string
  subnavGroups?: SubnavGroup[]
}

type Props = {
  className?: string
  darkMode?: boolean
  logoLink?: {
    href: string
    target?: '_self' | '_blank'
  }
  mainLinks?: MainLink[]
  secondaryLinks?: SecondaryLink[]
  ctaLink?: {
    href: string
    target?: '_self' | '_blank'
  }
  ctaText?: string
}

export function Navigation({
  className,
  darkMode = false,
  logoLink,
  mainLinks,
  secondaryLinks,
  ctaText,
  ctaLink,
}: Props) {
  const { sticky, stickyRef } = useSticky()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileNavOpen)
  }, [mobileNavOpen])

  return (
    <>
      <header
        ref={stickyRef}
        className={clsx(
          className,
          `fixed inset-x-0 top-0 z-20 flex flex-col transition-colors ${
            sticky ? 'bg-white shadow-md' : ''
          } ${mobileNavOpen ? 'inset-y-0 h-full min-h-0' : ''}`,
        )}
      >
        <nav
          className={clsx(
            'mx-auto flex h-[70px] w-full max-w-[1296px] items-center justify-between px-5 md:px-8 lg:justify-start lg:px-12',
            darkMode ? 'text-white' : 'text-gray-900',
            sticky && '!text-gray-900',
          )}
        >
          <Link href={logoLink?.href ?? '#'} target={logoLink?.target}>
            <svg
              width="128"
              height="30"
              viewBox="0 0 128 30"
              fill="none"
              className="[&_path]:transition-colors"
            >
              <path
                d="M34.769 7.995h11.636v2.39h-4.35v11.613h-2.928V10.384h-4.358V7.995z"
                className={clsx(
                  darkMode ? 'fill-white' : 'fill-[#1F222C]',
                  sticky && '!fill-[#1F222C]',
                )}
              ></path>
              <path
                d="M48.266 13.558h.061c.627-1.144 1.336-1.723 2.55-1.723.218-.013.438.014.647.078v2.33h-.062c-1.799-.177-3.095.743-3.095 2.86v4.895h-2.752V11.952h2.65v1.606zM58.93 20.88h-.043c-.527.765-1.274 1.353-3.055 1.353-2.128 0-3.622-1.078-3.622-3.075 0-2.213 1.86-2.918 4.168-3.231 1.72-.23 2.51-.371 2.51-1.144 0-.726-.587-1.195-1.741-1.195-1.296 0-1.922.458-2.003 1.41h-2.447c.08-1.762 1.438-3.31 4.471-3.31 3.117 0 4.372 1.35 4.372 3.7v5.124c0 .762.12 1.213.364 1.39V22h-2.65c-.163-.2-.265-.668-.324-1.12zm.019-2.427v-1.508c-.485.275-1.235.43-1.923.588-1.435.314-2.144.627-2.144 1.568 0 .94.648 1.272 1.62 1.272 1.576 0 2.447-.94 2.447-1.92zM66.127 13.322h.06c.709-1.077 1.655-1.645 3.073-1.645 2.145 0 3.583 1.568 3.583 3.76v6.56h-2.75V15.82c0-1.075-.648-1.83-1.802-1.83-1.213 0-2.105.94-2.105 2.31v5.699h-2.752V11.952h2.693v1.37zM74.224 18.746h2.55c.183 1.155 1.032 1.666 2.266 1.666s1.892-.458 1.892-1.156c0-.959-1.315-1.057-2.731-1.332-1.861-.352-3.682-.842-3.682-3.034 0-2.192 1.861-3.204 4.228-3.204 2.733 0 4.256 1.314 4.452 3.33h-2.48c-.12-1.078-.828-1.47-2.003-1.47-1.071 0-1.78.392-1.78 1.118 0 .862 1.376.94 2.854 1.233 1.74.352 3.662.824 3.662 3.172 0 2.018-1.78 3.23-4.372 3.23-3.014-.008-4.693-1.418-4.856-3.553zM84.48 16.984c0-2.996 2.025-5.307 5.181-5.307 2.691 0 4.351 1.508 4.715 3.682h-2.693c-.07-.435-.3-.83-.648-1.115a1.93 1.93 0 00-1.243-.432c-1.656 0-2.51 1.234-2.51 3.172 0 1.9.79 3.174 2.47 3.174 1.113 0 1.891-.57 2.083-1.705h2.65c-.182 2.135-1.891 3.838-4.672 3.838-3.29 0-5.332-2.31-5.332-5.307zM95.502 16.966c0-2.975 2.083-5.289 5.119-5.289 3.339 0 5.119 2.467 5.119 6.053h-7.528c.203 1.547 1.094 2.506 2.65 2.506 1.074 0 1.7-.472 2.005-1.234h2.71c-.383 1.78-2.021 3.289-4.693 3.289-3.44 0-5.382-2.33-5.382-5.325zm2.752-1.078h4.613c-.082-1.273-.945-2.154-2.206-2.154-1.456 0-2.166.842-2.407 2.154zM109.781 13.322h.059c.71-1.077 1.656-1.645 3.074-1.645 2.145 0 3.583 1.568 3.583 3.76v6.56h-2.753V15.82c0-1.075-.648-1.83-1.802-1.83-1.213 0-2.104.94-2.104 2.31v5.699h-2.75V11.952h2.693v1.37zM117.821 16.984c0-3.133 1.842-5.307 4.431-5.307.581-.025 1.159.1 1.675.362.515.262.95.65 1.259 1.128h.062V7.995H128v14.003h-2.651v-1.312h-.042c-.606.96-1.639 1.602-3.095 1.602-2.611.003-4.391-2.052-4.391-5.304zm7.486.06c0-1.92-.646-3.204-2.407-3.204-1.518 0-2.287 1.29-2.287 3.15 0 1.941.79 3.076 2.206 3.076 1.639-.011 2.488-1.183 2.488-3.023z"
                className={clsx(
                  darkMode ? 'fill-white' : 'fill-[#1F222C]',
                  sticky && '!fill-[#1F222C]',
                )}
              ></path>
              <g>
                <path
                  d="M2.117 17.18a20.118 20.118 0 01-.054-.338.983.983 0 00-.404-.66 1.05 1.05 0 00-.769-.191 1.06 1.06 0 00-.683.39.99.99 0 00-.197.745c.02.13.04.261.064.391a14.565 14.565 0 001.554 4.45c.063.117.149.22.253.304a1.044 1.044 0 00.755.228 1.056 1.056 0 00.7-.355.99.99 0 00.236-.73.976.976 0 00-.114-.375 12.68 12.68 0 01-1.34-3.858zM5.009 6.224a1.066 1.066 0 00.742-.302 13.32 13.32 0 013.684-2.593.994.994 0 00.591-.965.975.975 0 00-.353-.694 1.043 1.043 0 00-.758-.242 1.06 1.06 0 00-.392.107 15.393 15.393 0 00-4.256 2.991.997.997 0 00-.292.711.973.973 0 00.313.703c.192.183.451.285.721.284zM13.08 2.187h.049a13.876 13.876 0 014.52 0 1.053 1.053 0 00.88-.246.978.978 0 00.119-1.351 1.04 1.04 0 00-.646-.373 15.96 15.96 0 00-5.247 0h-.033c-.27.046-.51.194-.667.41a.975.975 0 00-.172.748c.047.261.2.494.424.646.224.152.502.212.772.166zM3.056 7.579a1.064 1.064 0 00-.787-.071c-.261.078-.48.253-.608.487a14.543 14.543 0 00-1.639 4.838c-.039.262.03.528.194.74a1.04 1.04 0 00.83.404c.248 0 .488-.087.675-.244a.992.992 0 00.347-.612c.22-1.465.7-2.883 1.418-4.19a.976.976 0 00-.117-1.106 1.028 1.028 0 00-.313-.246zM28.6 12.815l.054.329a.991.991 0 00.346.612c.188.157.428.244.676.244.05.003.1.003.149 0a1.04 1.04 0 00.68-.391.976.976 0 00.195-.742c-.02-.126-.04-.254-.062-.38a14.664 14.664 0 00-1.56-4.462 1.005 1.005 0 00-.25-.315 1.042 1.042 0 00-.766-.243 1.06 1.06 0 00-.713.364.99.99 0 00-.226.747c.015.133.059.262.127.378a12.678 12.678 0 011.35 3.859zM24.977 24.066a13.412 13.412 0 01-3.686 2.595c-.21.1-.377.265-.477.47a.97.97 0 00-.073.654c.053.22.182.416.364.556a1.056 1.056 0 001.099.114 15.409 15.409 0 004.256-2.995.999.999 0 00.32-.719.974.974 0 00-.312-.722 1.038 1.038 0 00-.755-.283 1.064 1.064 0 00-.733.33h-.003zM22.218 1.554a1.069 1.069 0 00-.792-.055 1.028 1.028 0 00-.6.504.975.975 0 00-.055.767c.087.252.274.46.52.58a13.48 13.48 0 013.689 2.597c.191.19.453.299.727.302.274.004.538-.098.734-.284a.985.985 0 00.312-.703.983.983 0 00-.293-.71 15.526 15.526 0 00-4.242-2.998zM17.617 27.812a13.841 13.841 0 01-4.557 0 1.06 1.06 0 00-.772.167.998.998 0 00-.424.646.975.975 0 00.172.747c.157.217.397.365.667.41 1.737.29 3.512.29 5.25 0h.037a1.049 1.049 0 00.664-.41.98.98 0 00.169-.745 1.007 1.007 0 00-.43-.648 1.07 1.07 0 00-.776-.167zM9.407 26.645a13.513 13.513 0 01-3.686-2.6 1.05 1.05 0 00-.727-.301 1.052 1.052 0 00-.735.283.985.985 0 00-.312.704.983.983 0 00.294.71 15.573 15.573 0 004.256 2.996 1.055 1.055 0 001.139-.146 1 1 0 00.244-.312.97.97 0 00.048-.761 1.011 1.011 0 00-.52-.573zM29.825 16.018a1.064 1.064 0 00-.774.183 1.01 1.01 0 00-.273.291.977.977 0 00-.136.37 12.644 12.644 0 01-1.418 4.193.971.971 0 00-.075.762c.081.254.263.466.505.59.242.124.526.15.788.072s.481-.254.61-.488a14.68 14.68 0 001.633-4.84.978.978 0 00-.19-.737 1.042 1.042 0 00-.67-.396zM9.08 8.366a9.363 9.363 0 015.233-2.311 9.648 9.648 0 012.088 0c.273.03.547-.046.761-.21a.978.978 0 00.167-1.406 1.043 1.043 0 00-.691-.373 11.76 11.76 0 00-2.554 0A11.442 11.442 0 007.686 6.89a.988.988 0 00-.334.695.982.982 0 00.272.72c.186.195.444.31.718.322.274.01.542-.084.743-.263l-.004.002zM15.351 26.005c.431 0 .861-.024 1.29-.071h.02a1.058 1.058 0 00.709-.365.99.99 0 00.225-.746.977.977 0 00-.127-.377 1.01 1.01 0 00-.267-.3 1.049 1.049 0 00-.776-.199h-.017a9.58 9.58 0 01-3.924-.383 9.36 9.36 0 01-3.406-1.926 1.037 1.037 0 00-.751-.285 1.063 1.063 0 00-.735.325.994.994 0 00-.268.738.975.975 0 00.362.698 11.562 11.562 0 007.665 2.89zM19.932 7.165A9.215 9.215 0 0122.875 9.7a8.865 8.865 0 011.594 3.489.998.998 0 00.359.574 1.057 1.057 0 00.861.206c.269-.053.504-.208.655-.43a.974.974 0 00.15-.75 10.812 10.812 0 00-1.946-4.265 11.238 11.238 0 00-3.597-3.1 1.056 1.056 0 00-.795-.11 1.047 1.047 0 00-.368.175.978.978 0 00.144 1.675zM6.395 9.95a1.067 1.067 0 00-.79-.027c-.257.093-.465.28-.58.52a10.583 10.583 0 00-.95 5.793 10.71 10.71 0 00.946 3.322c.056.12.136.229.236.319a1.046 1.046 0 00.744.27 1.068 1.068 0 00.724-.317 1 1 0 00.28-.72.979.979 0 00-.093-.382A8.734 8.734 0 016.075 15c0-1.286.286-2.557.837-3.727a.973.973 0 00-.188-1.098 1.034 1.034 0 00-.33-.227zM26.493 17.183a.969.969 0 00-.15-.752 1.017 1.017 0 00-.284-.278 1.054 1.054 0 00-.776-.153 1.053 1.053 0 00-.66.422.984.984 0 00-.156.36 8.879 8.879 0 01-1.585 3.495 9.227 9.227 0 01-2.936 2.547 1.01 1.01 0 00-.445.481.967.967 0 00-.046.644.996.996 0 00.37.536c.18.135.403.207.631.206.18 0 .356-.044.511-.13a11.274 11.274 0 003.588-3.11 10.85 10.85 0 001.938-4.268zM22.59 15.16a6.832 6.832 0 00-1.125-3.916 7.172 7.172 0 00-3.183-2.652 7.454 7.454 0 00-4.168-.493 7.324 7.324 0 00-3.75 1.832A6.946 6.946 0 008.3 13.47a6.788 6.788 0 00.314 4.053 7.04 7.04 0 002.588 3.2 7.396 7.396 0 003.99 1.27h.172a7.363 7.363 0 005.05-1.995 6.898 6.898 0 002.176-4.84v.002zm-7.35 4.835a5.279 5.279 0 01-2.85-.904 5.024 5.024 0 01-1.85-2.287 4.845 4.845 0 01-.224-2.895 4.959 4.959 0 011.48-2.527 5.23 5.23 0 012.675-1.306 5.323 5.323 0 012.976.351 5.123 5.123 0 012.272 1.891 4.88 4.88 0 01.806 2.794 4.93 4.93 0 01-1.598 3.5 5.265 5.265 0 01-3.687 1.383z"
                  className={clsx(
                    darkMode ? 'fill-white' : 'fill-blue-100',
                    sticky && '!fill-blue-100',
                  )}
                ></path>
              </g>
            </svg>
          </Link>

          <div className="mx-8 hidden h-5 border-r border-gray-200 lg:block" />

          <NavigationMenu.Root className="z-[1] hidden flex-1 lg:flex" delayDuration={0}>
            <NavigationMenu.List className="flex gap-8">
              {mainLinks?.map((mainLink, i) => (
                <NavigationMenu.Item key={i} className="relative">
                  <NavigationMenu.Trigger
                    className={clsx(
                      'group flex select-none items-center gap-2 py-5 text-sm font-bold leading-none text-current outline-none',
                      sticky && 'hover:text-blue-100',
                    )}
                  >
                    {mainLink.text}
                    <svg
                      viewBox="0 0 7 5"
                      fill="none"
                      className="linear relative h-[5px] w-[7px] stroke-current transition-transform duration-[250] group-data-[state=open]:-rotate-180"
                    >
                      <path
                        d="M1 1L3.5 3.5L6 1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content className="absolute -left-16 top-full flex w-full origin-top animate-fadeIn overflow-hidden rounded-xl bg-white shadow-md sm:w-auto">
                    {mainLink.subnavGroups?.map((subnavGroup, i) => (
                      <ul key={i} className="w-72 border-r border-gray-100">
                        <li className="px-6 pb-2 pt-6 text-xxs font-bold uppercase tracking-widest text-gray-700">
                          {subnavGroup.heading}
                        </li>
                        {subnavGroup.subnavLinks?.map((subnavLink, i) => (
                          <li key={i}>
                            <NavigationMenu.Link asChild>
                              <Link
                                href={subnavLink.link?.href ?? '#'}
                                target={subnavLink.link?.target}
                                className="group flex w-full cursor-pointer select-none items-start gap-x-4 px-6 py-2 outline-none transition-colors hover:bg-gray-100"
                              >
                                {subnavLink?.icon && (
                                  <Image
                                    src={subnavLink.icon.url}
                                    alt={subnavLink.iconAlt}
                                    width={24}
                                    height={24}
                                  />
                                )}

                                <div className="flex-1 tracking-wide">
                                  <p className="text-lg font-bold leading-normal text-gray-700 group-hover:text-blue-100">
                                    {subnavLink.linkText}
                                  </p>

                                  {subnavLink.subtext && (
                                    <p className="leading-normal text-gray-400 group-hover:text-blue-100">
                                      {subnavLink.subtext}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <ul className="hidden items-center gap-8 text-sm font-bold leading-none text-current lg:flex">
            {secondaryLinks?.map((secondaryLink, i) => (
              <li key={i}>
                <Link
                  href={secondaryLink.link?.href ?? '#'}
                  target={secondaryLink.link?.target}
                  className={`${sticky && 'hover:text-blue-100'} `}
                >
                  {secondaryLink.linkText}
                </Link>
              </li>
            ))}

            {ctaText && (
              <li>
                <LinkButton
                  link={ctaLink}
                  size="medium"
                  variant="outlined"
                  color={darkMode && !sticky ? 'white' : 'gray'}
                  showIcon={false}
                >
                  {ctaText}
                </LinkButton>
              </li>
            )}
          </ul>

          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className={clsx('block w-7 lg:hidden', sticky ? 'text-gray-900' : 'text-white')}
          >
            <svg
              viewBox="0 0 26 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-6 w-[26px] stroke-current"
            >
              {mobileNavOpen ? (
                <path id="close" d="M3 2L23 22Z M3 22L23 2"></path>
              ) : (
                <path id="menu" d="M1 2H25Z M1 12H25Z M1 22H25"></path>
              )}
            </svg>
          </button>
        </nav>

        <nav
          className={clsx(
            'flex-1 flex-col overflow-auto bg-white py-8',
            mobileNavOpen ? 'flex' : 'hidden',
          )}
        >
          <Accordion.Root type="multiple" className="flex-1" asChild>
            <ul className="text-lg font-bold">
              {mainLinks?.map((mainLink, i) => (
                <Accordion.Item value={'item' + i} key={i} asChild>
                  <li>
                    <Accordion.Trigger className="group flex w-full items-center gap-2 px-6 py-5 text-left">
                      {mainLink.text}
                      <svg
                        viewBox="0 0 7 5"
                        fill="none"
                        className="linear relative top-[1px] h-[5px] w-[7px] stroke-current transition-transform duration-[250] group-data-[state=open]:-rotate-180"
                      >
                        <path
                          d="M1 1L3.5 3.5L6 1"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </Accordion.Trigger>

                    <Accordion.AccordionContent className="space-y-8 px-10 py-2">
                      {mainLink.subnavGroups?.map((subnavGroup, i) => (
                        <ul key={i} className="border-b border-gray-200 pb-2">
                          {subnavGroup.heading && (
                            <li className="pb-2 text-xxs font-bold uppercase tracking-widest text-gray-700">
                              {subnavGroup.heading}
                            </li>
                          )}

                          {subnavGroup.subnavLinks?.map((subnavLink, i) => (
                            <li key={i}>
                              <Link
                                href={subnavLink.link?.href ?? '#'}
                                target={subnavLink.link?.target}
                                className="group flex w-full cursor-pointer select-none items-start gap-x-4 py-2 outline-none"
                              >
                                {subnavLink.icon && (
                                  <Image
                                    src={subnavLink?.icon.url}
                                    alt="Icon"
                                    width={24}
                                    height={24}
                                  />
                                )}

                                <div className="flex-1 tracking-wide">
                                  <p className="text-base font-bold leading-normal text-gray-700 group-hover:text-blue-100">
                                    {subnavLink.linkText}
                                  </p>

                                  {subnavLink.subtext && (
                                    <p className="text-sm font-normal leading-normal text-gray-400 group-hover:text-blue-100">
                                      {subnavLink.subtext}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </Accordion.AccordionContent>
                  </li>
                </Accordion.Item>
              ))}
              {secondaryLinks?.map((secondaryLink, i) => (
                <li key={i}>
                  <Link
                    href={secondaryLink.link?.href ?? '#'}
                    target={secondaryLink.link?.target}
                    className="block w-full px-6 py-4"
                  >
                    {secondaryLink.linkText}
                  </Link>
                </li>
              ))}

              {ctaText && (
                <li className="w-full px-6 py-5 text-center">
                  <Link
                    href={ctaLink?.href ?? '#'}
                    target={ctaLink?.target}
                    className="rounded-lg border border-current px-5 py-2.5 text-center tracking-wider transition-colors"
                  >
                    {ctaText}
                  </Link>
                </li>
              )}
            </ul>
          </Accordion.Root>
        </nav>
      </header>
    </>
  )
}
