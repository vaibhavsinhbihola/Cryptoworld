import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetCryptoExchangeQuery } from '../services/cryptoExchangeApi';
import Loader from './Loader';
import { LinkOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Panel } = Collapse;

function Exchanges() {

  const { data, isFetching } = useGetCryptoExchangeQuery();

  const exchangesList = data;
  if (isFetching) return <Loader />;
  return (
    <div >
      <Row className='Exchange-title'>
        <Col span={7} ><strong>Exchanges</strong></Col>
        <Col span={6} ><strong>24h Trade Volume</strong></Col>
        <Col span={5} ><strong>Trust Score</strong></Col>
        <Col span={5} ><strong>Year Established</strong></Col>
        <Col span={1} ><strong>Link</strong></Col>
      </Row>
      <Row gutter={[5, 5]} wrap={true}>
        {exchangesList.map((exchange) => (
          <Col span={24}>

            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={1}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                    </Col>
                    <Col span={6} >
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>

                    <Col className='exchange-data' span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col className='exchange-data' span={5}>{millify(exchange.trust_score)}</Col>
                    <Col className='exchange-data' span={5}>{(exchange.year_established)}</Col>
                    <Col className='exchange-data' span={1}> <a href={exchange.url} target="_blank" rel="noreferrer"><LinkOutlined /></a></Col>

                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || exchange.url)}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Exchanges