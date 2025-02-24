import { Contract } from 'ethers'
import { Wallet } from 'zksync-web3'
import { FeeAmount, TICK_SPACINGS } from './constants'
import { encodePriceSqrt } from './encodePriceSqrt'
import { getMaxTick, getMinTick } from './ticks'

export async function createPool(nft: Contract, wallet: Wallet, tokenAddressA: string, tokenAddressB: string) {
  if (tokenAddressA.toLowerCase() > tokenAddressB.toLowerCase())
    [tokenAddressA, tokenAddressB] = [tokenAddressB, tokenAddressA]

  await (
    await nft.createAndInitializePoolIfNecessary(tokenAddressA, tokenAddressB, FeeAmount.MEDIUM, encodePriceSqrt(1, 1))
  ).wait()

  const liquidityParams = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    fee: FeeAmount.MEDIUM,
    tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    recipient: wallet.address,
    amount0Desired: 1000000,
    amount1Desired: 1000000,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 2 ** 32,
  }

  return await (await nft.mint(liquidityParams)).wait()
}

export async function createPoolWithMultiplePositions(
  nft: Contract,
  wallet: Wallet,
  tokenAddressA: string,
  tokenAddressB: string
) {
  if (tokenAddressA.toLowerCase() > tokenAddressB.toLowerCase())
    [tokenAddressA, tokenAddressB] = [tokenAddressB, tokenAddressA]

  await (
    await nft.createAndInitializePoolIfNecessary(tokenAddressA, tokenAddressB, FeeAmount.MEDIUM, encodePriceSqrt(1, 1))
  ).wait()

  const liquidityParams = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    fee: FeeAmount.MEDIUM,
    tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    recipient: wallet.address,
    amount0Desired: 1000000,
    amount1Desired: 1000000,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 2 ** 32,
  }

  await (await nft.mint(liquidityParams)).wait()

  const liquidityParams2 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    fee: FeeAmount.MEDIUM,
    tickLower: -60,
    tickUpper: 60,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 2 ** 32,
  }

  await (await nft.mint(liquidityParams2)).wait()

  const liquidityParams3 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    fee: FeeAmount.MEDIUM,
    tickLower: -120,
    tickUpper: 120,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 2 ** 32,
  }

  return await (await nft.mint(liquidityParams3)).wait()
}

export async function createPoolWithZeroTickInitialized(
  nft: Contract,
  wallet: Wallet,
  tokenAddressA: string,
  tokenAddressB: string
) {
  if (tokenAddressA.toLowerCase() > tokenAddressB.toLowerCase())
    [tokenAddressA, tokenAddressB] = [tokenAddressB, tokenAddressA]

  await (
    await nft.createAndInitializePoolIfNecessary(tokenAddressA, tokenAddressB, FeeAmount.MEDIUM, encodePriceSqrt(1, 1))
  ).wait()

  const liquidityParams = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    fee: FeeAmount.MEDIUM,
    tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    recipient: wallet.address,
    amount0Desired: 1000000,
    amount1Desired: 1000000,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 2 ** 32,
  }

  await (await nft.mint(liquidityParams)).wait()

  const liquidityParams2 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    fee: FeeAmount.MEDIUM,
    tickLower: 0,
    tickUpper: 60,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 2 ** 32,
  }

  await (await nft.mint(liquidityParams2)).wait()

  const liquidityParams3 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    fee: FeeAmount.MEDIUM,
    tickLower: -120,
    tickUpper: 0,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 2 ** 32,
  }

  return await (await nft.mint(liquidityParams3)).wait()
}
