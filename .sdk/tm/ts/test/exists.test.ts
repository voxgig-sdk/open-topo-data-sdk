
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenTopoDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpenTopoDataSDK.test()
    equal(null !== testsdk, true)
  })

})
