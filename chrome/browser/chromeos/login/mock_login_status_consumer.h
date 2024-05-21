// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef CHROME_BROWSER_CHROMEOS_LOGIN_MOCK_LOGIN_STATUS_CONSUMER_H_
#define CHROME_BROWSER_CHROMEOS_LOGIN_MOCK_LOGIN_STATUS_CONSUMER_H_

#include "chrome/browser/chromeos/login/login_status_consumer.h"
#include "testing/gmock/include/gmock/gmock.h"

namespace chromeos {

class MockConsumer : public LoginStatusConsumer {
 public:
  MockConsumer();
  virtual ~MockConsumer();

  MOCK_METHOD1(OnLoginFailure, void(const LoginFailure& error));
  MOCK_METHOD0(OnDemoUserLoginSuccess, void(void));
  MOCK_METHOD4(OnLoginSuccess, void(
      const std::string& username,
      const std::string& password,
      bool pending_requests,
      bool using_oauth));
  MOCK_METHOD0(OnOffTheRecordLoginSuccess, void(void));
  MOCK_METHOD0(OnPasswordChangeDetected, void(void));

  // The following functions can be used in gmock Invoke() clauses.

  // Compatible with LoginStatusConsumer::OnDemoUserLoginSuccess()
  static void OnDemoUserSuccessQuit();
  static void OnDemoUserSuccessQuitAndFail();

  // Compatible with LoginStatusConsumer::OnOffTheRecordLoginSuccess()
  static void OnGuestSuccessQuit();
  static void OnGuestSuccessQuitAndFail();

  // Compatible with LoginStatusConsumer::OnLoginSuccess()
  static void OnSuccessQuit(
      const std::string& username,
      const std::string& password,
      bool pending_requests,
      bool using_oauth);
  static void OnSuccessQuitAndFail(
      const std::string& username,
      const std::string& password,
      bool pending_requests,
      bool using_oauth);

  // Compatible with LoginStatusConsumer::OnLoginFailure()
  static void OnFailQuit(const LoginFailure& error);
  static void OnFailQuitAndFail(const LoginFailure& error);

  // Compatible with LoginStatusConsumer::OnPasswordChangeDetected()
  static void OnMigrateQuit();
  static void OnMigrateQuitAndFail();
};

}  // namespace chromeos

#endif  // CHROME_BROWSER_CHROMEOS_LOGIN_MOCK_LOGIN_STATUS_CONSUMER_H_