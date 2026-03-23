'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const spec = {
  openapi: '3.0.0',
  info: {
    title: 'SkillPath AI API Documentation',
    version: '1.0.0',
    description: 'API endpoints for SkillPath AI features like assessment, career recommendation, and project evaluation.',
  },
  paths: {
    '/api/recommend': {
      post: {
        summary: 'Generate Career Recommendations',
        description: 'Returns top 3 matched careers based on user profile and interests using AI.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  pendidikan: { type: 'string' },
                  jurusan: { type: 'string' },
                  minat: { type: 'string', description: 'Wajib diisi' },
                  archetype: { type: 'string' },
                  roleInterests: { type: 'array', items: { type: 'string' } },
                },
                required: ['minat'],
              },
            },
          },
        },
        responses: {
          '200': { description: 'Successful response' },
          '400': { description: 'Validation Error' },
          '429': { description: 'Rate Limit Exceeded' },
        },
      },
    },
    '/api/evaluate-project': {
      post: {
        summary: 'Evaluate Student Project',
        description: 'Analyzes a submitted project link and provides feedback and skill tracking.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  projectTitle: { type: 'string', description: 'Wajib diisi' },
                  submissionLink: { type: 'string', description: 'Wajib URL yang valid' },
                  difficulty: { type: 'string' },
                  career: { type: 'string' },
                },
                required: ['projectTitle', 'submissionLink'],
              },
            },
          },
        },
        responses: {
          '200': { description: 'Successful evaluation' },
          '400': { description: 'Validation Error' },
        },
      },
    },
  },
};

export default function ApiDoc() {
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <SwaggerUI spec={spec} />
      </div>
    </div>
  );
}
