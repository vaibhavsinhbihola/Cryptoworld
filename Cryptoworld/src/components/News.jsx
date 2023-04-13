import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Image } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;
const {Meta} = Card;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card" style={{height: '550px'}} cover={<img src={news?.image?.thumbnail?.contentUrl || demoImage} />}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>{news.name.length > 80 ? `${news.name.substring(0, 80)}...` : news.name}</Title>
              </div>
              <p>{`${news.description.substring(0, 80)}...`}</p>
              <div className="provider-container">
                <div>
                  <Meta
                  avatar={<Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />}
                    description={`${news.provider[0]?.name} ${moment(news.datePublished).startOf('ss').fromNow()}`}
                  />
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
