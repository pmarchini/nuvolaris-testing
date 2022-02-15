/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
const {TestConfig, buildConfig} = require('../config');

const configuration = new TestConfig();

configuration.testNotReturningJson = buildConfig({
  code: `
  package main
  import (
  	"bufio"
  	"fmt"
  	"os"
  )
  func main() {
  	reader := bufio.NewReader(os.Stdin)
  	out := os.NewFile(3, "pipe")
  	defer out.Close()
    fmt.Fprintf(out, \`{ \"ok\": true}%s\`, \"\\n\")
  	reader.ReadBytes('\\n')
  	fmt.Fprintln(out, \"a string but not a map\")
  	reader.ReadBytes('\\n')
  }
`
});

configuration.testInitCannotBeCalledMoreThanOnce = buildConfig({
  code: `
  package main
  func Main(args map[string]interface{}) map[string]interface{} {
   return args
  }
`});

configuration.testEntryPointOtherThanMain = buildConfig({
  code: `
  package main
  func Niam(args map[string]interface{}) map[string]interface{} {
   return args
  }
`, main: 'niam',
});

configuration.testEcho = buildConfig({
  code: `
  package main
  import "fmt"
  import "log"
  func Main(args map[string]interface{}) map[string]interface{} {
   fmt.Println("hello stdout")
   log.Println("hello stderr")
   return args
  }
`});

configuration.testUnicode = buildConfig({
  code: `
  package main
  import "fmt"
  func Main(args map[string]interface{}) map[string]interface{} {
  	delimiter := args["delimiter"].(string)
  	str := delimiter + " ☃ " + delimiter
    fmt.Println(str)
  	res := make(map[string]interface{})
  	res["winter"] = str
  	return res
  }
`});

configuration.testEnvParameters = buildConfig({
  code: `
  package main
  import "os"
  func Main(args map[string]interface{}) map[string]interface{} {
   res := make(map[string]interface{})
   res["SOME_VAR"] = os.Getenv("SOME_VAR")
   res["ANOTHER_VAR"] = os.Getenv("ANOTHER_VAR")
   return res
  }
`});

configuration.testEnv = buildConfig({
  code: `
  package main
  import "os"
  func Main(args map[string]interface{}) map[string]interface{} {
  	res := make(map[string]interface{})
  	res["api_host"] = os.Getenv("__OW_API_HOST")
  	res["api_key"] = os.Getenv("__OW_API_KEY")
  	res["namespace"] = os.Getenv("__OW_NAMESPACE")
  	res["action_name"] = os.Getenv("__OW_ACTION_NAME")
  	res["action_version"] = os.Getenv("__OW_ACTION_VERSION")
  	res["activation_id"] = os.Getenv("__OW_ACTIVATION_ID")
  	res["deadline"] = os.Getenv("__OW_DEADLINE")
  	return res
  }
  `,
});

configuration.testLargeInput = buildConfig({
  code: `
  package main
  func Main(args map[string]interface{}) map[string]interface{} {
   return args
  }  
`,});

module.exports = configuration;
