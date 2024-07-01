"use client"

import Image from "next/image";
import styles from "./page.module.scss";
import { Col, Row } from "antd";
import CodeMirror from '@uiw/react-codemirror';
import { useState } from "react";
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/antd';
import validator from '@rjsf/validator-ajv8';

export default function Home() {
  const initialSchema = {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
        default: "Chuck",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      age: {
        type: "integer",
        title: "Age",
      },
      married: {
        type: "boolean",
        title: "Marriage Status"
      }
    },
  };


  const initialUiSchema = {
    "firstName": {
      "ui:autofocus": true,
      "ui:placeholder": "Enter your first name"
    },
    "lastName": {
      "ui:widget": "text",
      "ui:placeholder": "Enter your last name"
    },
    "age": {
      "ui:widget": "updown",
      "ui:title": "Age",
      "ui:description": "Your age in years"
    },
    "married": {
      "ui:widget": "radio",
      "ui:title": "Marital Status",
      "ui:options": {
        "enumOptions": [
          {
            "label": "Yes",
            "value": true
          },
          {
            "label": "No",
            "value": false
          }
        ]
      }
    }
  };

  const [rjsf, setRjsf] = useState<any>(initialSchema);
  const [uiScheme, setUiScheme] = useState<any>(initialUiSchema);
  const [body, setBody] = useState<any>()

  const handleRjsfChange = (value: string) => {
    try {
      const parsedValue = JSON.parse(value);
      setRjsf(parsedValue);
    } catch (error) {
      console.error("Invalid JSON for rjsf schema:", error);
    }
  };

  const handleUiSchemeChange = (value: string) => {
    try {
      const parsedValue = JSON.parse(value);
      setUiScheme(parsedValue);
    } catch (error) {
      console.error("Invalid JSON for uiScheme:", error);
    }
  };

  return (
    <Row justify={'center'}>
      <Col lg={20}>
        <h1>RJSF Playground</h1>
        <Row justify={'space-between'}>
          <Col span={11}>
            <Col span={24}>
              <h2>RJSF Schema</h2>
              <CodeMirror
                value={JSON.stringify(rjsf, null, 2)}
                height="200px"
                onChange={(editor) => handleRjsfChange(editor)}
              />
            </Col>
            <Col span={24}>
              <h2>UI Schema</h2>
              <CodeMirror
                value={JSON.stringify(uiScheme, null, 2)}
                height="200px"
                onChange={(editor) => handleUiSchemeChange(editor)}
              />
            </Col>
          </Col>
          <Col span={11}>
            <h2>Form</h2>
            <Form
              schema={rjsf}
              uiSchema={uiScheme}
              validator={validator}
              onSubmit={(value) => setBody(value?.formData)}
            />
          </Col>
        </Row>
        <Row>
        <Col span={24}>
        <h2>Request Body</h2>
        <CodeMirror
                value={JSON.stringify(body, null, 2)}
                height="200px"
              />
        </Col>
      </Row>
      </Col>
    </Row>
  );
}
