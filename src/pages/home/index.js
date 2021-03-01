import React, {useEffect, useState, useCallback} from 'react';
import {Row, Col, List, Button, Input, message, Popconfirm} from 'antd';
import './index.less';
import EasyMDE from 'easymde';
import {DeleteOutlined} from '@ant-design/icons';
import {fsHelper, pathname} from '../../untils/fshelper.js';
import EleStore from '../../untils/elestore.js';
import {v4 as uuidv4} from 'uuid';
const eleStore = new EleStore();
const {app} = global.electron.remote;
let easyMDE = undefined;

const Home = () => {
    const [dataSource, setDataSource] = useState([]);
    const [markValue, setMarkValue] = useState('');
    const [itemInfo, setItemInfo] = useState({});

    const getData = useCallback(() => {
        const res = eleStore.getItem('pathList');
        if (res) {
            const dataSource = JSON.parse(res) || [];
            setDataSource(dataSource);
        }
    }, []);

    const renderMarkFun = useCallback(() => {
        const container = document.getElementsByClassName('EasyMDEContainer');
        if (container.length < 1 && !easyMDE) {
            easyMDE = new EasyMDE({
                element: document.getElementById('my-text-area'),
                hideIcons: ['guide'],
                minHeight: 'calc(100vh - 100px)',
                showIcons: [
                    'strikethrough',
                    'code',
                    'table',
                    'redo',
                    'heading',
                    'undo',
                    'heading-bigger',
                    'heading-smaller',
                    'heading-1',
                    'heading-2',
                    'heading-3',
                    'clean-block',
                    'ordered-list',
                    'horizontal-rule'
                ],
                initialValue: ''
            });
        }
    }, []);

    const handleNew = () => {
        if (easyMDE) {
            easyMDE.value('');
            setItemInfo({});
        }
    };

    //保存
    const handleSave = async () => {
        let val = easyMDE ? easyMDE.value() : '';
        let url = pathname(`${app.getPath('documents')}/${itemInfo.name}.md`);
        let newSource = [...dataSource];
        if (!itemInfo.name) {
            return message.error('名称不能为空！');
        }
        if (!itemInfo.id) {
            if (newSource.some(item => item.name === itemInfo.name)) {
                return message.error('名称不能重复！');
            }
            await fsHelper.write(url, val);
            let newItemInfo = {...itemInfo, id: uuidv4(), url};
            newSource.push(newItemInfo);
            let res = eleStore.setItem('pathList', newSource);
            if (res) {
                setItemInfo(newItemInfo);
                setDataSource(newSource);
            }
        } else {
            const itemObj = newSource.find(item => item.id === itemInfo.id);
            if (itemObj.name !== itemInfo.name) {
                const oldUrl = pathname(`${app.getPath('documents')}/${itemObj.name}`);
                await fsHelper.rname(oldUrl, url);
                const newSourceSe = newSource.map(item => (item.id === itemInfo.id ? {...itemInfo, url} : item));
                eleStore.setItem('pathList', newSourceSe);
                setDataSource(newSourceSe);
            }
            await fsHelper.write(url, val);
            return message.success('保存成功！');
        }
    };

    const handleChange = e => setItemInfo({...itemInfo, name: e.target.value});

    //删除
    const handleDel = async (e, item) => {
        e.stopPropagation();
        if (item.id) {
            const newDataSource = dataSource.filter(it => it.id !== item.id);
            let res = await fsHelper.haveBol(item.url);
            if (res) {
                await fsHelper.delete(item.url);
            }
            setDataSource(newDataSource);
            eleStore.setItem('pathList', newDataSource);
        }
        setItemInfo({});
    };

    const handleActive = async (e, item) => {
        if (easyMDE) {
            let res = await fsHelper.haveBol(item.url);
            if (res) {
                const value = await fsHelper.read(item.url);
                easyMDE.value(value);
                setItemInfo(item);
            } else {
                return message.error('文件已被删除！');
            }
        }
    };

    useEffect(() => {
        renderMarkFun();
        getData();
    }, [getData, renderMarkFun]);
    return (
        <div className="tms-home">
            <Row>
                <Col xs={10} sm={8} md={6} lg={5} xl={4} xxl={3}>
                    <Col>
                        <Button onClick={handleNew} className="tms-but-new" type="primary" block>
                            新建
                        </Button>
                    </Col>
                    <List
                        size="small"
                        locale="没有数据..."
                        dataSource={dataSource}
                        renderItem={item => (
                            <List.Item
                                className={item.id === itemInfo.id ? 'tms-title-list tms-theme tms-bg' : 'tms-title-list'}
                                onClick={e => handleActive(e, item)}
                            >
                                <span className="tms-oneline"> {item.name}</span>
                                <Popconfirm
                                    title="你确定删除该条数据吗?"
                                    onClick={e => e.stopPropagation()}
                                    onConfirm={e => handleDel(e, item)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <DeleteOutlined className=" tms-icon-del" />
                                </Popconfirm>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={14} sm={16} md={18} lg={19} xl={20} xxl={21}>
                    <Row>
                        <Col span={18}>
                            <Input className="tms-title-input" maxLength={50} placeholder="请输入标题..." onChange={handleChange} value={itemInfo.name} />
                        </Col>
                        <Col span={6} className="tms-right">
                            <Button className="tms-mr" type="primary" onClick={handleSave}>
                                保存
                            </Button>
                        </Col>
                    </Row>
                    <Col>
                        <textarea id="my-text-area" />
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
