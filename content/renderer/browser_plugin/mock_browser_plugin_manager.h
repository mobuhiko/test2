// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef CONTENT_RENDERER_BROWSER_PLUGIN_BROWSER_PLUGIN_MANAGER_IMPL_H_
#define CONTENT_RENDERER_BROWSER_PLUGIN_BROWSER_PLUGIN_MANAGER_IMPL_H_

#include "content/renderer/browser_plugin/browser_plugin_manager.h"

#include "base/memory/scoped_ptr.h"
#include "ipc/ipc_message_utils.h"
#include "ipc/ipc_test_sink.h"

namespace content {

class MockBrowserPluginManager : public BrowserPluginManager {
 public:
  MockBrowserPluginManager();
  virtual ~MockBrowserPluginManager();

  // BrowserPluginManager implementation.
  virtual BrowserPlugin* CreateBrowserPlugin(
      RenderViewImpl* render_view,
      WebKit::WebFrame* frame,
      const WebKit::WebPluginParams& params) OVERRIDE;

  // Iterate over all BrowserPlugins and tell them to cleanup after themselves
  // before we blow away the MockRenderProcess.
  void Cleanup();

  // Provides access to the messages that have been received by this thread.
  IPC::TestSink& sink() { return sink_; }

  // IPC::Sender implementation.
  virtual bool Send(IPC::Message* msg) OVERRIDE;

  // RenderProcessObserver override.
  virtual bool OnControlMessageReceived(const IPC::Message& message) OVERRIDE;
 private:
  IPC::TestSink sink_;

  // The last known good deserializer for sync messages.
  scoped_ptr<IPC::MessageReplyDeserializer> reply_deserializer_;

  DISALLOW_COPY_AND_ASSIGN(MockBrowserPluginManager);
};

}  // namespace content

#endif  // CONTENT_RENDERER_BROWSER_PLUGIN_TESTS_BROWSER_PLUGIN_MANAGER_IMPL_H_
